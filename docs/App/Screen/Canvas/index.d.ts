import React from 'react';
declare class Canvas extends React.Component<any, any> {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    size: number;
    color: string;
    opacity: number;
    constructor(props: any);
    onSnap(): void;
    onChange(value: string): void;
    getRandomUsers(): any;
    fadeOut(left: number, top: number, width: number, height: number, index: number): void;
    drawParticle(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number, clear: boolean): void;
    animate(index: number): void;
    addUsers(): void;
    renderUser(name: string, fade: string): JSX.Element;
    renderThanos(): JSX.Element;
    renderIronMan(): JSX.Element;
    render(): JSX.Element;
}
export default Canvas;
