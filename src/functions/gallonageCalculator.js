
export const gallonageCalculator = ({ shape, length, width, shortWidth, longWidth, depth }) => {
    switch(shape) {
        case 'rectangle':
            return Math.round(length * width * depth * 7.5)
        case 'circular':
            let radius = Math.floor(width / 2)
            return Math.round(3.14 * ( radius * radius ) * depth * 7.5)
        case 'irregular':
            return Math.round(0.45 * (shortWidth + longWidth) * length * depth * 7)
        default:
            return alert('Please select a pool shape')
    }
}
