// three v0.183 ships no .d.ts files; bare ambient declaration suppresses TS7016
// and lets dynamic import("three") resolve to `any`.
declare module "three";
