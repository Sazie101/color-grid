'use strict';

import { onEvent, select, selectById, selectAll, print } from "./utility.js";

const submit = select('button');
const shapeSelect = selectById('shape');
const colorSelect = selectById('color');
const gridContainer = selectById('grid');
const info = select('p');
const shapesArray = [];

function addToGrid(shape) {
    gridContainer.appendChild(shape.element);
    shapesArray.push(shape);
}

class Shape {
    static shapeCounter = 0;

    constructor(shapeType, color) {
        this.shapeNumber = ++Shape.shapeCounter;
        this.shapeType = shapeType;
        this.color = color;
        this.element = this.createShape();
    }

    createShape() {
        const shape = document.createElement('div');
        shape.style.backgroundColor = this.color;
        shape.style.width = '80px';
        shape.style.height = '80px';
        shape.style.margin = '5px';
        shape.className = 'grid-shapes';

        if (this.shapeType === 'circle') {
            shape.classList.add('grid-circle');
        } else {
            shape.classList.add('grid-square');
        }

        switch (this.color) {
            case 'blue':
                shape.style.backgroundColor = '#09f';
                break;
            case 'green':
                shape.style.backgroundColor = '#9f0';
                break;
            case 'orange':
                shape.style.backgroundColor = '#f90';
                break;
            case 'pink':
                shape.style.backgroundColor = '#f09';
                break;
            default:
                shape.style.backgroundColor = '#90f';
        }

        onEvent('click', shape, () => {
            displayShapeInfo(this);
        });

        return shape;
    }
}

function displayShapeInfo(shape) {
    info.innerText = `Unit: ${shape.shapeNumber}, Shape: ${shape.shapeType}, Color: ${shape.color}`;
}

onEvent('click', submit, function (event) {
    event.preventDefault();

    const selectedShape = shapeSelect.value;
    const selectedColor = colorSelect.value;

    if (shapesArray.length < 30) {
        if (selectedShape !== '' && selectedColor !== '') {
            const newShape = new Shape(selectedShape, selectedColor);
            addToGrid(newShape);
        } else {
            info.innerText = 'Please fill in the fields';
        }
    } else {
        info.innerText = 'The grid is full';
    }
});