import {
    Color,
    CylinderGeometry,
    Primitive,
    GeometryInstance,
    MaterialAppearance,
    Material,
    Cartesian3
} from 'cesium'

export default class ArrowPolyline {
    constructor(option = {},matrix) {
        this._color = option.color || Color.RED;
        this._width = option.width || 3;
        this._headWidth = option.headWidth || 2 * this._width;
        this._length = option.length || 300
        this._headLength = option.headLength || 10
        this._inverse = option.inverse || false
        this.position = option.position
        
        const id = option.id 
        const line = CylinderGeometry.createGeometry(new CylinderGeometry({
            length: this._length,
            topRadius: this._width,
            bottomRadius: this._width
        }));
        const arrow = CylinderGeometry.createGeometry(new CylinderGeometry({
            length: this._headLength,
            topRadius: 0,
            bottomRadius: this._headWidth
        }));
        let offset = (this._length + this._headLength) / 2
        if (this._inverse) {
            offset = -offset
        }

        ArrowPolyline.translate(arrow, [0, 0, offset]);

        let primitive = new Primitive({
            modelMatrix: matrix,
            geometryInstances: [
                new GeometryInstance({
                    id: id + '-line',
                    geometry: line,
                }),
                new GeometryInstance({
                    id: id + '-arrow',
                    geometry: arrow,
                })
            ],
            appearance: new MaterialAppearance({
                material: Material.fromType('Color', { color: this._color })
            }),
            asynchronous:false
        });
        return primitive
    }
    
    static translate = function (geometry, offset) {
        const scratchOffset = new Cartesian3();
        if (Array.isArray(offset)) {
            scratchOffset.x = offset[0];
            scratchOffset.y = offset[1];
            scratchOffset.z = offset[2];
        } else {
            Cartesian3.clone(offset, scratchOffset);
        }

        for (let i = 0; i < geometry.attributes.position.values.length; i += 3) {
            geometry.attributes.position.values[i] += scratchOffset.x;
            geometry.attributes.position.values[i + 1] += scratchOffset.y;
            geometry.attributes.position.values[i + 2] += scratchOffset.z;
        }
    }
}