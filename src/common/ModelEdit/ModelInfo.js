import {
    Cartesian3,
    Transforms,
    Ellipsoid,
    HeadingPitchRoll
} from 'cesium'

export const refreshMatrix = (x,y,z) => {
    let position = Cartesian3.fromDegrees(x, y, z)
    let hpRoll = new HeadingPitchRoll(0, 0, 0);
    let fixedFrame = Transforms.localFrameToFixedFrameGenerator('north','west');
    return Transforms.headingPitchRollToFixedFrame(position, hpRoll, Ellipsoid.WGS84, fixedFrame, position)
}
