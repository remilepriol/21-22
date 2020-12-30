export function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function getBounds(image, x, y) {
    return {
        top: y,
        bottom: y + image.height,
        left: x,
        right: x + image.width,
    };
}

export function intersects(image, x, y, otherImage, otherX, otherY, margin) {
    const bounds = getBounds(image, x, y);
    const otherBounds = getBounds(otherImage, otherX, otherY);
    return (
        bounds.left - margin < otherBounds.right &&
        bounds.right + margin > otherBounds.left &&
        bounds.top - margin < otherBounds.bottom &&
        bounds.bottom + margin > otherBounds.top
    );
}

export function modulus(n, m) {
  return ((n % m) + m) % m;
}