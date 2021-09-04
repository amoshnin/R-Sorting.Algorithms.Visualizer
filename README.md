# Sorting Visualizer

Sorting algorithms are an essential chapter of a computer science curriculum at the undergraduate level. This group of algorithms provides a quick introduction to the principles and techniques of theoretical computer science and algorithm analysis due to its simple nature and relatively straightforward examination.

This React/Redux web (in TypeScript) application presents my own demo program for sortings algorithms, called "Sorting Visualization and Audibilization", which visualizes the algorithms internals and their operations, and generates sound effects from the values being compared. See below for YouTube videos created with the demo.

## Usage

- The Sound of Sorting demo program is very intuitive to use. It contains many sorting algorithms, which are selectable via the list box on the right. For the quick sort variants the pivot rule can be selected separately.

- The number of value comparisons and array accesses is tracked and shown in real time. The ternary comparisons are included in the comparison counter as a single operation. The array access counter is largely dependent on the actual algorithm implementation due to the fact that algorithms frequently need extra memory or local variables.

- The sound effects produced are determined on the values being compared. Only comparisons (except in radix/bucket sort) produce audible output! The "Sound Sustain" slider may be used to adjust the length of each comparison's sound effect. The sound's frequency is determined using the comparing data. The sound wave is triangular, with an ADSR envelope modulating it. This gives the impression of a "8-bit gaming music." The frequency range 120 Hz - 1,212 Hz is scaled (with double accuracy) to an item value, which is substantial but not too high to be annoying.

## Source of inspiration

Main inspiration was from the amazing [animated sorting algorithms](https://www.toptal.com/developers/sorting-algorithms) by David R. Martin
YouTube video on QuickSort visualization = (https://www.youtube.com/watch?v=eqo2LxRADhU)
https://panthema.net/2013/sound-of-sorting/
