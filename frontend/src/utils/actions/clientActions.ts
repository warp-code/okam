"use client";

export function calculateBuyPrice(quadraticParam: number, linearParam: number, constantParam: number, quantity: number): number {
    return Math.floor((quadraticParam * Math.pow(quantity, 2)) + (linearParam * quantity) + constantParam);
}

export function calculateSellPrice(buyPrice: number): number {
    return Math.floor(buyPrice * 9 / 10);
}