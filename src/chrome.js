import React, {useState} from "react";
import {animated, useSpring} from "react-spring";
import "./chrome.css";


export function Picto({name, title, extension='svg'}) {
    return <img src={`./icons/${name}.${extension}`} className="picto" alt={title}/>;
}

export function ZoomButtons({onHomeClick, onZoomClick, onShuffleClick, onLanguageClick}) {
    return (
        <div className="chrome zoom">
            <div className="chrome-button zoom-home" onClick={onHomeClick}>
                <Picto name="home" title="home"/>
            </div>
            <div className="chrome-button zoom-plus" onClick={onZoomClick.bind(null, 1)}>
                +
            </div>
            <div className="chrome-button zoom-minus" onClick={onZoomClick.bind(null, -1)}>
                -
            </div>
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
            <Picto name={filters[name] ? "carre-plein" : "carre-vide"} extension={"png"}/> {label}
        </div>
    );
}

export function Menu({filters, filtersNames, onFilterClick, isMobile}) {
    const [open, setOpen] = useState(!isMobile);
    const {height, angle} = useSpring({
        from: {height: 0},
        height: open ? 260 : 0,
        angle: open ? 1 : 0,
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
        <div className="chrome menu">
            <img src={`./icons/2122-Logo_Cercle.jpg`} className="logo" alt="logo cercle"/>
            <animated.div
                style={{
                    height: height.interpolate(height => `${height}px`),
                    overflow: "hidden",
                }}
            >
                <div className="menu-section menu-contact">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="mailto:contact@21-22.com"
                    >
                        contact@21-22.com
                    </a>
                    {/*<br/>
                    <div className="menu-social">
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.linkedin.com/in/louise-plantin-4b021186/"
                        >
                            <Picto name="linkedin" title="LinkedIn" />
                        </a>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.twitter.com/louiseplantin/"
                        >
                            <Picto name="twitter" title="Twitter" />
                        </a>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.instagram.com/louise.plantin/"
                        >
                            <Picto name="insta" title="Instagram" />
                        </a>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.malt.fr/profile/louiseplantin"
                        >
                            <Picto name="malt" title="Malt" />
                        </a>
                    </div>*/}
                </div>
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
                <Picto name={"f-basse"}/>
            </animated.div>
        </div>
    );
}
