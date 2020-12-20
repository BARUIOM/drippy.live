<template>
    <svg class="animate-spin circular" viewBox="25 25 50 50">
        <circle
            class="path"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke="currentColor"
        />
    </svg>
</template>

<style lang="scss" scoped>
$width: 10vh;

.circular {
    width: $width;
    height: $width;
    position: relative;
}

.path {
    stroke-width: 3px;
    stroke-linecap: round;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: dash 1.5s ease-in-out infinite;
}

@keyframes dash {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35;
    }

    100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124;
    }
}
</style>