import React from 'react';

import CanvasStyled, { User, UserHolder, ImageButton } from './Canvas.Styled';
import TextInput from '../../Components/TextInput';
import Button from '../../Components/Button';

const thanosGauntlet = require('../../Imgs/thanosGauntlet.png');
const thanosSnap = require('../../Imgs/thanosSnap.jpg');
const ironManGauntlet = require('../../Imgs/ironmanGauntlet.png');
const ironManSnap = require('../../Imgs/ironmanSnap.png');
const userIcon = require('../../Imgs/userIcon.png');

class Canvas extends React.Component<any, any> {
    ctx: CanvasRenderingContext2D;

    x: number;

    y: number;

    size: number;

    color: string;

    opacity: number;

    constructor(props:any) {
        super(props);
        this.state = {
            canvasWidth: 0,
            canvasHeight: 0,
            fade: 'visible',
            persons: [],
            userName: '',
            snapPersons: [],
        };
    }

    onSnap() {
        const { fade, persons, snapPersons } = this.state;
        let snapVal:any = [];
        if (fade === 'visible') {
            snapVal = this.getRandomUsers();
        } else {
            const person = persons;
            snapPersons.forEach((el:number) => {
                person[el] = {
                    ...person[el],
                    fade: persons[el].fade === 'visible' ? 'fade-out' : 'fade-in',
                };
                this.setState((pre:any) => ({
                    ...pre,
                    persons: person,
                }));
            });
        }
        snapVal.forEach((el:number, index:number) => {
            const p = document.getElementById(persons[el].name);
            if (p) {
                const person = persons;
                if (index !== 0) {
                    setTimeout(() => {
                        person[el] = {
                            ...person[el],
                            fade: persons[el].fade === 'visible' ? 'fade-out' : 'fade-in',
                        };
                        this.setState((pre:any) => ({
                            ...pre,
                            persons: person,
                            snapPersons: snapVal,
                        }), () => {
                            if (person[el].fade === 'fade-out') {
                                this.fadeOut(p.offsetLeft, p.offsetTop, p.offsetWidth, p.offsetHeight, el);
                            }
                        });
                    }, 4000);
                } else {
                    person[el] = {
                        ...person[el],
                        fade: persons[el].fade === 'visible' ? 'fade-out' : 'fade-in',
                    };
                    this.setState((pre:any) => ({
                        ...pre,
                        persons: person,
                        snapPersons: snapVal,
                    }), () => {
                        if (person[el].fade === 'fade-out') {
                            this.fadeOut(p.offsetLeft, p.offsetTop, p.offsetWidth, p.offsetHeight, el);
                        }
                    });
                }
            }
        });
        this.setState((pre:any) => ({
            ...pre,
            fade: 'hidden',
        }));
        // this.fadeOut(200, 300, 20, 20);
    }

    onChange(value: string) {
        this.setState((pre:any) => ({
            ...pre,
            userName: value,
        }));
    }

    getRandomUsers() {
        const { persons } = this.state;
        if (persons) {
            if (persons.length === 1) {
                return [0];
            }
            const snapPersons:any = [];
            for (let i = 0; i < Math.floor(persons.length / 2); i += 1) {
                let num;
                do {
                    num = Math.ceil(Math.random() * (persons.length - 1));
                } while (snapPersons.includes(num));
                snapPersons.push(num);
            }
            return snapPersons;
        }
        return [];
    }

    fadeOut(left:number, top:number, width:number, height:number, index:number) {
        const canvas = document.querySelector('canvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const c = canvas.getContext('2d');
            const particles:any = [];
            if (c) {
                for (let i = left; i <= (left + width); i += 3) {
                    for (let j = top; j <= (top + height); j += 3) {
                        particles.push({
                            x: i, y: j, size: 0.5, color: '#000000', opacity: (Math.random() * 9), speed: (Math.random() * (2 - 1) + 1),
                        });
                    }
                }
                this.setState((pre:any) => ({
                    ...pre,
                    ctx: c,
                    particles,
                    isOpacity: true,
                }), () => this.animate(index));
            }
        }
    }

    drawParticle(ctx:CanvasRenderingContext2D, x:number, y:number, size:number, color:string, opacity:number, clear:boolean) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.opacity = opacity;
        if (clear) this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.beginPath();
        ctx.globalAlpha = opacity;
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.stroke();
    }

    animate(index:number) {
        const {
            ctx, particles, isOpacity, persons,
        } = this.state;
        if (isOpacity) {
            requestAnimationFrame(() => this.animate(index));
            let opacityVal = true;
            const temp = particles;
            particles.forEach((el:any, pos:number) => {
                this.drawParticle(ctx, el.x, el.y, el.size, el.color, el.opacity, pos === 0);
                temp[pos] = {
                    ...temp[pos],
                    x: temp[pos].x + (el.speed) * 0.5,
                    y: temp[pos].y - (el.speed) * 0.75,
                    opacity: temp[pos].opacity > 0 ? temp[pos].opacity - 0.05 : 0,
                };
                if (temp[pos].opacity !== 0) opacityVal = false;
            });
            this.setState((pre:any) => ({
                ...pre,
                particles: temp,
                isOpacity: !opacityVal,
            }));
        } else {
            const person = persons;
            person[index] = {
                ...person[index],
                fade: person[index].fade === 'fade-out' ? 'hidden' : 'visible',
            };
            this.setState((pre:any) => ({
                ...pre,
                persons: person,
            }));
        }
    }

    addUsers() {
        const { userName } = this.state;
        this.setState((pre:any) => ({
            ...pre,
            persons: [...pre.persons, { name: userName, fade: 'visible' }],
            userName: '',
        }));
    }

    // eslint-disable-next-line class-methods-use-this
    renderUser(name: string, fade:string) {
        return (
            <User className={fade} id={name} key={name}>
                <figure>
                    <img src={userIcon.default} alt={name} />
                </figure>
                <span>
                    {name}
                </span>
            </User>
        );
    }

    renderThanos() {
        const { fade, persons } = this.state;
        if (persons.length > 0 && fade === 'visible') {
            return (
                <ImageButton onClick={() => this.onSnap()} disabled={fade === 'hidden'}>
                    <div className="thanos-btn">
                        <figure className="thanos-gauntlet">
                            <img src={thanosGauntlet.default} alt="thanos" />
                        </figure>
                        <figure className="thanos-snap">
                            <img src={thanosSnap.default} alt="thanos" />
                        </figure>
                    </div>
                </ImageButton>
            );
        }
        return <></>;
    }

    renderIronMan() {
        const { fade, isOpacity } = this.state;
        if (fade === 'hidden' && !isOpacity) {
            return (
                <ImageButton onClick={() => this.onSnap()}>
                    <div className="ironman-btn">
                        <figure className="ironman-gauntlet">
                            <img src={ironManGauntlet.default} alt="ironman" />
                        </figure>
                        <figure className="ironman-snap">
                            <img src={ironManSnap.default} alt="ironman" />
                        </figure>
                    </div>
                </ImageButton>
            );
        }
        return <></>;
    }

    render() {
        const { persons, userName } = this.state;
        return (
            <CanvasStyled>
                <canvas style={{
                    position: 'absolute', zIndex: -1, width: window.innerWidth, height: window.innerHeight,
                }}
                />
                <h2 style={{ marginLeft: '10px' }}>
                    Gauntlet
                </h2>
                <div style={{ display: 'flex', alignItems: 'flex-end', marginLeft: '10px' }}>
                    <TextInput
                        value={userName}
                        placeholder="Enter Names"
                        onChange={(val:string) => this.onChange(val)}
                        onEnter={() => (userName ? this.addUsers() : {})}
                        autoFocus
                        label={{
                            labelValue: 'Name',
                            required: true,
                        }}
                    />
                    {
                        userName
                            ? <Button onClick={() => this.addUsers()}>Add</Button>
                            : <></>
                    }
                </div>
                {this.renderIronMan()}
                {this.renderThanos()}
                <UserHolder>
                    {
                        persons.map((el:any) => (
                            this.renderUser(el.name, el.fade)
                        ))
                    }
                </UserHolder>
            </CanvasStyled>
        );
    }
}

export default Canvas;
