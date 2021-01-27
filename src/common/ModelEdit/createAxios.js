import {
    Matrix3,
    Matrix4,
    Cartesian3,
    Color,
    Math as CesiumMath,
    PolylineGeometry,
    GeometryInstance,
    ColorGeometryInstanceAttribute,
    Primitive,
    PolylineColorAppearance,
    when
} from 'cesium'
import ArrowPolyline from './ArrowPolyline'

import {
    viewer
} from '@/assets/js/Map/init3dMap'

import {destroyAxios} from '@/assets/js/ModelEdit/destoryAxios'

export let axisSphereX = null
export let axisSphereY = null
export let axisSphereZ = null
export let axisX = null
export let axisY = null
export let axisZ = null

let createAxisSphere = (id, position, color, matrix) => {
    const geometry = new PolylineGeometry({
        positions: position,
        width: 10
    });
    const instnce = new GeometryInstance({
        geometry: geometry,
        id: id,
        attributes: {
            color: ColorGeometryInstanceAttribute.fromColor(color)
        }
    });
    let primitive = new Primitive({
        geometryInstances: instnce,
        appearance: new PolylineColorAppearance({
            translucent: false
        }),
        modelMatrix: matrix
    });
    return primitive
}   


export let createAxios = (store,model,matrix) => {

    const position = [];
    
    const mx = Matrix3.fromRotationY(CesiumMath.toRadians(90))
    const rotationX = Matrix4.fromRotationTranslation(mx)
    
    const my = Matrix3.fromRotationX(CesiumMath.toRadians(90))
    const rotationY = Matrix4.fromRotationTranslation(my)

    destroyAxios()

    when(model.readyPromise).then((m)=>{
        let realScale = Matrix4.getScale(m.modelMatrix,new Cartesian3()).x
        let radius = m.boundingSphere.radius/realScale
        let { x,y,z} = store.state.model.position
        let width = radius * 0.06630031856130572
        let headwidth = radius * 0.11050053093550953
        let headlength = radius * 0.22100106187101906
        
        axisY = new ArrowPolyline({
            id: "axisX",
            color: Color.GREEN,
            position: Cartesian3.fromDegrees(x, y, z),
            width: width,
            headWidth: headwidth,
            length: radius * 4 + 50,
            headLength: headlength
        },matrix);

        axisX = new ArrowPolyline({
            id: "axisY",
            color: Color.BLUE,
            position: Cartesian3.fromDegrees(x, y, z),
            width: width,
            headWidth: headwidth,
            length: radius * 4 + 50,
            headLength: headlength
        },matrix)
    
        axisZ = new ArrowPolyline({
            id: "axisZ",
            color: Color.RED,
            position: Cartesian3.fromDegrees(x, y, z),
            width: width,
            headWidth: headwidth,
            length: radius * 4 + 50,
            headLength: headlength
        },matrix);
        
        viewer.scene.primitives.add(axisX)
        viewer.scene.primitives.add(axisY)
        viewer.scene.primitives.add(axisZ)

        Matrix4.multiply(
            axisX.geometryInstances[0].modelMatrix,
            rotationX,
            axisX.geometryInstances[0].modelMatrix
        )
        Matrix4.multiply(
            axisX.geometryInstances[1].modelMatrix,
            rotationX,
            axisX.geometryInstances[1].modelMatrix
        )
    
        Matrix4.multiply(
            axisY.geometryInstances[0].modelMatrix,
            rotationY,
            axisY.geometryInstances[0].modelMatrix
        )
        Matrix4.multiply(
            axisY.geometryInstances[1].modelMatrix,
            rotationY,
            axisY.geometryInstances[1].modelMatrix
        )
        
        // =======================================================

        for (let i = 0; i <= 360; i += 3) {
            const sin = Math.sin(CesiumMath.toRadians(i));
            const cos = Math.cos(CesiumMath.toRadians(i));
            const x = radius * 4 / 3 * cos;
            const y = radius * 4 / 3 * sin;
            position.push(new Cartesian3(x, y, 0));
        }

        axisSphereX = createAxisSphere(
            "axisSphereX",
            position,
            Color.BLUE,
            matrix
        )
    
        axisSphereY = createAxisSphere(
            "axisSphereY",
            position,
            Color.GREEN,
            matrix
        )
            
        axisSphereZ = createAxisSphere(
            "axisSphereZ",
            position,
            Color.RED,
            matrix
        )
    
        viewer.scene.primitives.add(axisSphereY);
        viewer.scene.primitives.add(axisSphereX);
        viewer.scene.primitives.add(axisSphereZ);
        
        Matrix4.multiply(
            axisSphereX.geometryInstances.modelMatrix,
            rotationX,
            axisSphereX.geometryInstances.modelMatrix
        )
    
        Matrix4.multiply(
            axisSphereY.geometryInstances.modelMatrix,
            rotationY,
            axisSphereY.geometryInstances.modelMatrix
        )
        
        setTimeout(() => {
            store.commit('CHANGE_SCALE_X',realScale)
        }, 500);
    })

}