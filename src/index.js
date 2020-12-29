import {render} from "react-dom";
import React, {useRef, useState} from "react";
import {animated, useSprings} from "react-spring";
import {useGesture} from "react-use-gesture";
import {clamp, random, shuffle} from "lodash-es";
import MobileDetect from "mobile-detect";

import {intersects} from "./utils";
import {ArrowButtons, Menu, ZoomButtons} from "./chrome";
import "./styles.css";
import originalImages from "./images.json";

const images = shuffle(originalImages);

const INITIAL_ZOOM = 0.2;
const INITIAL_FILTERS = {
    blog: true,
    clients: true,
    equipe: true,
    outils: true,
    raison: true,
    redirections: true
};
const INITIAL_MAP_POSITION = {x: 0, y: 0};

const MARGIN = 300;
const GRID_SIZE = 400;

const ZOOM_SPEED_BUTTONS = 1.7;
const MIN_ZOOM = 0.04;
const HIDE_IMAGES_ZOOM = 0.1;
const MAX_ZOOM = 1.3;
const MOVE_SPEED = 20;

function generatePositions(images, filters) {
    const positions = [];

    images.forEach(image => {
        if (!filters[image.filter]) {
            // don't compute for images hidden by filters
            positions.push([0, 0]);
            return;
        }
        let x = random(-50, 50) * GRID_SIZE;
        let y = random(-50, 50) * GRID_SIZE;
        let theta = 0;
        let radius = 0;

        let hasIntersection = true;

        while (hasIntersection) {
            hasIntersection = false;
            theta += (random(10, 25) / 180) * Math.PI;
            if (theta > Math.PI * 2) {
                radius += 50;
            }
            x = Math.floor(Math.cos(theta) * radius);
            y = Math.floor(Math.sin(theta) * radius);
            for (let i = 0; i < positions.length; i++) {
                let position = positions[i];
                hasIntersection =
                    hasIntersection ||
                    intersects(image, x, y, images[i], position[0], position[1], MARGIN);
            }
        }

        positions.push([x, y]);
    });
    return positions;
}

const MIDDLE = {x: window.innerWidth / 2, y: window.innerHeight / 2};

function getImagesParams(imagePositions, mapPosition, zoomLevel, filters) {
    return i => {
        return {
            xys: [
                MIDDLE.x +
                (imagePositions.current[i][0] + mapPosition.current.x) * zoomLevel.current,
                MIDDLE.y +
                (imagePositions.current[i][1] + mapPosition.current.y) * zoomLevel.current,
                zoomLevel.current,
            ],
            display: filters[images[i].filter] ? "block" : "none",
        };
    };
}

function LegendSpan({xys, cutoff, text}) {
    return (
        <animated.span
            style={{
                display: xys.interpolate((x, y, s) => (s > cutoff ? "inline" : "none")),
            }}
        >
            {" | "}
            {text}
        </animated.span>
    );
}

function showImage(x, y, s, image, mapPosition) {
    const displayMargin = 50;
    if (x > window.innerWidth + displayMargin) {
        return false;
    }
    if (y > window.innerHeight + displayMargin) {
        return false;
    }
    if (x + image.width * s + displayMargin < 0) {
        return false;
    }
    if (y + image.height * s + displayMargin < 0) {
        return false;
    }
    return true;
}

function getSourceVariant(s, image) {
    let scale;
    if (s > 1) {
        scale = "@4x";
    } else if (s > 0.4) {
        scale = "@3x";
    } else if (s > 0.1) {
        scale = "@2x";
    } else {
        scale = "@1x";
    }
    return `url("${image.src}${scale}.jpg")`;
}

const isMobile = new MobileDetect(window.navigator.userAgent).mobile();

function Viewpager() {
    const zoomLevel = useRef(INITIAL_ZOOM);
    const mapPosition = useRef(INITIAL_MAP_POSITION);
    const [filters, setFilters] = useState(INITIAL_FILTERS);
    const imagePositions = useRef(generatePositions(images, filters));
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const [propsImages, setImages] = useSprings(
        images.length,
        getImagesParams(imagePositions, mapPosition, zoomLevel, filters)
    );

    const bind = useGesture({
        onDrag: ({vxvy: [vx, vy]}) => {
            document.body.style.cursor = "url('./icons/carre-fleche.svg'), move";
            mapPosition.current = {
                x: (vx * MOVE_SPEED) / zoomLevel.current + mapPosition.current.x,
                y: (vy * MOVE_SPEED) / zoomLevel.current + mapPosition.current.y,
            };
            setImages(getImagesParams(imagePositions, mapPosition, zoomLevel, filters));
        },
        onDragEnd: () => {
            document.body.style.cursor = "default";
        },
        onPinch: ({previous: [previousDistance, previousAngle], da: [distance, angle]}) => {
            if (!isMobile) {
                return;
            }
            const zoomSpeed = Math.pow(distance / previousDistance, 2);
            zoomLevel.current = clamp(zoomLevel.current * zoomSpeed, MIN_ZOOM, MAX_ZOOM);
            setImages(getImagesParams(imagePositions, mapPosition, zoomLevel, filters));
        },
        onWheel: ({delta: [xDelta, yDelta]}) => {
            if (isMobile) {
                return;
            }
            const WIDTH = 10000;

            const multiplier = 1 - (yDelta * (MAX_ZOOM - MIN_ZOOM)) / WIDTH;

            zoomLevel.current = clamp(zoomLevel.current * multiplier, MIN_ZOOM, MAX_ZOOM);
            setImages(getImagesParams(imagePositions, mapPosition, zoomLevel, filters));
        },
    });

    const handleZoom = direction => {
        zoomLevel.current = clamp(
            direction > 0
                ? ZOOM_SPEED_BUTTONS * zoomLevel.current
                : zoomLevel.current / ZOOM_SPEED_BUTTONS,
            MIN_ZOOM,
            MAX_ZOOM
        );
        setImages(getImagesParams(imagePositions, mapPosition, zoomLevel, filters));
    };

    const handleZoomToImageIndex = index => {
        const imagePos = imagePositions.current[index];
        const image = images[index];
        setSelectedImageIndex(index);

        if (image.width > image.height) {
            zoomLevel.current = Math.max(
                window.innerWidth / (image.width - 10),
                window.innerHeight / (image.height - 10)
            );
        } else {
            zoomLevel.current = Math.min(
                window.innerWidth / (image.width - 10),
                window.innerHeight / (image.height - 10)
            );
        }

        mapPosition.current = {
            x: -imagePos[0] - image.width / 2,
            y: -imagePos[1] - image.height / 2,
        };
        setImages(getImagesParams(imagePositions, mapPosition, zoomLevel, filters));
    };

    let moved = false;

    return (
        <div {...bind()} id="container" onDoubleClick={handleZoom.bind(null, 1)}>
            <ZoomButtons
                onHomeClick={() => {
                    zoomLevel.current = INITIAL_ZOOM;
                    mapPosition.current = INITIAL_MAP_POSITION;
                    setFilters(INITIAL_FILTERS);
                    imagePositions.current = generatePositions(images, INITIAL_FILTERS);
                    setImages(getImagesParams(imagePositions, mapPosition, zoomLevel, filters));
                }}
                onZoomClick={handleZoom}
                onShuffleClick={() => {
                    imagePositions.current = generatePositions(images, filters);
                    setImages(getImagesParams(imagePositions, mapPosition, zoomLevel, filters));
                }}
            />
            <ArrowButtons
                onClick={direction => {
                    let newIndex =
                        selectedImageIndex === null ? 0 : selectedImageIndex + direction;
                    while (!filters[images[newIndex].filter]) {
                        newIndex = (newIndex + direction) % (images.length - 1);
                    }

                    handleZoomToImageIndex(newIndex);
                }}
            />
            {/*<SearchBar onSearch={() => {}} />*/}
            <Menu
                filters={filters}
                onFilterClick={filter => {
                    const newFilters = {...filters, [filter]: !filters[filter]};
                    setFilters(newFilters);
                    setSelectedImageIndex(0);
                    zoomLevel.current = INITIAL_ZOOM;
                    imagePositions.current = generatePositions(images, newFilters);
                    setImages(getImagesParams(imagePositions, mapPosition, zoomLevel, newFilters));
                }}
                isMobile={isMobile}
            />
            {/*<animated.div className="debug-info">
                {propsImages.map(({xys, display}, i) => (
                    <animated.div
                        style={{
                            padding: "5px",
                            backgroundColor: xys.interpolate((x, y, s) =>
                                showImage(x, y, s, images[i], mapPosition.current) ? "blue" : "red"
                            ),
                            flex: 1,
                        }}
                    >
                        {i}
                    </animated.div>
                ))}
            </animated.div>*/}
            <animated.div id="map">
                {propsImages.map(({xys, display}, i) => (
                    <animated.div
                        className="image-container"
                        key={i}
                        style={{
                            display: xys.interpolate((x, y, s) =>
                                showImage(x, y, s, images[i], mapPosition.current)
                                    ? display.value
                                    : "none"
                            ),
                            transform: xys.interpolate(
                                (x, y, s) => `translate3d(${x}px,${y}px,0)`
                            ),
                        }}
                    >
                        <animated.div
                            className="image"
                            style={{
                                width: `${images[i].width}px`,
                                height: `${images[i].height}px`,
                                transform: xys.interpolate((x, y, s) => `scale(${s})`),
                                transformOrigin: "0 0",
                                backgroundImage: xys.interpolate((x, y, s) =>
                                    getSourceVariant(s, images[i])
                                ),
                                opacity: xys.interpolate((x, y, s) =>
                                    s > HIDE_IMAGES_ZOOM
                                        ? 1
                                        : s / (HIDE_IMAGES_ZOOM - MIN_ZOOM) - 1
                                ),
                                boxShadow: xys.interpolate(
                                    (x, y, s) => `0 4px ${14 / s}px 0px rgb(208, 208, 208)`
                                ),
                            }}
                            onMouseDown={() => {
                                moved = false;
                            }}
                            onMouseMove={() => {
                                moved = true;
                            }}
                            onMouseUp={() => {
                                if (!moved) {
                                    handleZoomToImageIndex(i);
                                }
                            }}
                        />
                        <animated.div
                            className="legend"
                            style={{
                                position: "absolute",
                                top: xys.interpolate((x, y, s) => `${images[i].height * s}px`),
                                width: xys.interpolate(
                                    (x, y, s) =>
                                        `${s > HIDE_IMAGES_ZOOM ? images[i].width * s : 1000}px`
                                ),
                            }}
                        >
                            {images[i].name}
                            <LegendSpan xys={xys} cutoff={0.1} text={images[i].category}/>
                        </animated.div>
                    </animated.div>
                ))}
            </animated.div>
        </div>
    );
}

// prevent pinch-to-zoom on Chrome / Firefox OSX
document.getElementById("root").addEventListener("wheel", event => {
    event.preventDefault();
});

render(<Viewpager/>, document.getElementById("root"));
