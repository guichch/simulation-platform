import {
    axisSphereX,
    axisSphereY,
    axisSphereZ,
    axisX,
    axisY,
    axisZ
} from './createAxios'

import {
    Matrix4,
    Matrix3,
    Math as CesiumMath
} from 'cesium'

import  { model } from './Model'

import {
    refreshMatrix
} from '@/assets/js/ModelEdit/ModelInfo'

const rotationY = Matrix4.fromRotationTranslation(Matrix3.fromRotationX(CesiumMath.toRadians(90)));
const rotationX = Matrix4.fromRotationTranslation(Matrix3.fromRotationY(CesiumMath.toRadians(90)));

export const ChangeModelMatrix = (matrix) => {
    model.modelMatrix = matrix
}

export const ChangeModelAxisMatrix = (matrix) =>{
    axisX.modelMatrix = Matrix4.clone(matrix)
    axisY.modelMatrix = Matrix4.clone(matrix)
    axisZ.modelMatrix = Matrix4.clone(matrix)
    axisSphereX.modelMatrix = Matrix4.clone(matrix)
    axisSphereY.modelMatrix = Matrix4.clone(matrix)
    axisSphereZ.modelMatrix = Matrix4.clone(matrix)
    Matrix4.multiply(axisX.modelMatrix,rotationX,axisX.modelMatrix)
    Matrix4.multiply(axisY.modelMatrix,rotationY,axisY.modelMatrix)
    Matrix4.multiply(axisSphereX.modelMatrix,rotationX,axisSphereX.modelMatrix)
    Matrix4.multiply(axisSphereY.modelMatrix,rotationY,axisSphereY.modelMatrix)
}

export const ChangeStateAndMatrix = (tx,ty,tz,rx,ry,rz,sx)=>{
    let rotateMatrix = new Matrix3()
    let modelMatrix = refreshMatrix(tx, ty, tz)
    Matrix4.multiply(modelMatrix, Matrix4.fromUniformScale(sx), modelMatrix)
    ChangeModelAxisMatrix(modelMatrix)
    Matrix3.multiply(Matrix3.fromRotationX(CesiumMath.toRadians(rx)),Matrix3.fromRotationY(CesiumMath.toRadians(ry)),rotateMatrix)
    Matrix3.multiply(rotateMatrix,Matrix3.fromRotationZ(CesiumMath.toRadians(rz)),rotateMatrix)
    Matrix4.multiplyByMatrix3(modelMatrix,rotateMatrix,modelMatrix)
    ChangeModelMatrix(modelMatrix)
}



