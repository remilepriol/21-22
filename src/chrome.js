import React, {useState} from "react";
import {animated, useSpring} from "react-spring";
import "./chrome.css";

export function Picto({name, title, extension = 'svg'}) {
    return <img src={`./icons/${name}.${extension}`} className="picto" alt={title}/>;
}

export function Divider() {
    return <img
        src={'icons/ligne-horizontale.svg'}
        className='horizontal-divider'
        alt='divider'
    />
}

export function ZoomButtons({onHomeClick, onZoomClick, onShuffleClick, onLanguageClick}) {
    return (
        <div className="chrome zoom">
            <div className="chrome-button zoom-home" onClick={onHomeClick}>
                <Picto name="home" title="home"/>
            </div>
            <Divider/>
            <div className="chrome-button zoom-plus" onClick={onZoomClick.bind(null, 1)}>
                <Picto name="plus" title="plus"/>
            </div>
            <Divider/>
            <div className="chrome-button zoom-minus" onClick={onZoomClick.bind(null, -1)}>
                <Picto name="minus" title="minus"/>
            </div>
            <Divider/>
            <div className="chrome-button zoom-shuffle" onClick={onShuffleClick}>
                <Picto name="shuffle" title="shuffle"/>
            </div>
            {/*<div className="chrome-button zoom-language" onClick={onLanguageClick}>
                En
            </div>*/}
        </div>
    );
}

export function ArrowButtons({onClick}) {
    return (
        <div className="chrome arrow">
            <div className="chrome-button arrow-left" onClick={onClick.bind(null, -1)}>
                <Picto name="f-gauche" title="left"/>
            </div>
            <div className="chrome-button arrow-right" onClick={onClick.bind(null, 1)}>
                <Picto name="f-droite" title="right"/>
            </div>
        </div>
    );
}

export function SearchBar({onSearch}) {
    return (
        <div className="chrome search">
            <div className="search-input-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Client | Année | Projet..."
                />
            </div>
            <div className="chrome-button chrome-button-search">
                <Picto name="loupe" title="search"/>
            </div>
        </div>
    );
}

function MenuFilterOption({filters, name, label, onChange}) {
    return (
        <div className="menu-filters-option" onClick={onChange.bind(null, name)}>
            <Picto name={filters[name] ? "carre-plein" : "carre-vide"} extension={"svg"}/> {label}
        </div>
    );
}

export function Menu({filters, filtersNames, onFilterClick, isMobile}) {
    const [open, setOpen] = useState(!isMobile);
    const {height, width, angle} = useSpring({
        from: {height: 0},
        height: open ? 280 : 0,
        width: !isMobile ? 200 : (open ? 200 : 100),
        angle: open ? 0 : 1,
        config: {duration: 200},
    });

    const filtersList = [];
    for (let filter in filters) {
        filtersList.push(
            <MenuFilterOption
                filters={filters}
                name={filter}
                key={filter}
                label={filtersNames[filter]}
                onChange={onFilterClick}
            />
        )
    }

    return (
        <animated.div
            className="chrome menu"
            style={{
                width: width.interpolate(width => `${width}px`),
                overflow: "hidden",
            }}
        >
            <img
                src={`./icons/2122-Logo_Cercle.jpg`}
                alt="logo cercle"
                style={{width: '100%'}}
            />
            <animated.div
                style={{
                    height: height.interpolate(height => `${height}px`),
                    overflow: "hidden",
                }}
            >
                <Divider/>
                <div
                    className="menu-section menu-contact"
                >
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="mailto:contact@21-22.com"
                        style = {{fontSize: '14px'}}
                    >
                        contact@21-22.com
                    </a>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.linkedin.com/company/vingt-et-un-vingt-deux/"
                        style={{padding:'10px', verticalAlign:'text-top'}}
                    >
                        <Picto name="linkedin" title="LinkedIn"/>
                    </a>
                    <br/>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://redirection-ecologique.21-22.com/"
                    >
                        <img
                            src={'icons/bouton_vers_blog.jpg'}
                            alt='Blog'
                            style={{width: '100%'}}
                        />
                    </a>
                </div>
                <Divider/>
                <div className="menu-section menu-filters">
                    {filtersList}
                </div>
            </animated.div>
            <div className="menu-collapse"/>
            <animated.div
                className="close-button"
                onClick={() => setOpen(!open)}
                style={{transform: angle.interpolate(a => `rotate(${a * 180}deg)`)}}
            >
                <Picto name={"f-haute"}/>
            </animated.div>
        </animated.div>
    );
}
