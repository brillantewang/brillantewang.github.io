# TeacherPay - An analysis on teacher salaries to student outcomes across the world.

## Background and Overview
As a former teacher, I had heard at some point that countries that paid their teachers the highest salaries also had the best overall education systems, which implied best student achievement.

This project will be a way to confirm if that is true by analyzing data provided by the Organization for Economic Cooperation and Development (OECD). TeacherPay will be a simple and beautiful visual tool that shows the relationship between teacher pay and student performance outcomes on science, math, and reading across the 35 countries that are members of the OECD.

At the most basic level, users will be presented a graph with teacher salaries on the X axis and student performance outcomes on the Y axis. To break down what these components mean:

### Student Performance Outcomes
This will represent the mean score on the Programme for International Student Assessment (PISA), an international survey which aims to evaluate education systems worldwide by testing the skills and knowledge of 15-year-old students. Users will be able to toggle between different PISA assessments such as science, math, and reading.

I have not decided if this will be shown as a percentile or absolute score yet. 

### Teacher Salaries
This will represent the mean annual statutory teacher salary in public institutions converted to USD using Purchasing Power Parity (PPP) for teachers with 15 years of teaching experience. Users will be able to toggle between different types of teachers such as upper secondary and primary school teachers.

## Functionality & MVP

Countries will be represented by colored circles.

Upon initialization:

- [ ] Countries will float onto the graph one by one to their respective positions starting from the bottom-left corner to the top-right corner.

Users will be able to:

- [ ] Toggle between continents and see countries fade in or out.
- [ ] Toggle between different PISA assessments (science, math, reading) on the Y axis and see countries float to their new positions.
- [ ] Toggle between different teacher types (primary, lower secondary, upper secondary) on the X axis and see countries float to their new positions.
- [ ] Click on a country so that it expands and shows specific data points such as teacher salary, PISA mean score, and bonus info such as classroom size.

Bonus:
- [ ] Users will be able to click and drag a country around and have it bounce back to its original position upon letting go.

### Wireframes

TeacherPay will show a single graph populated with circles representing different countries. There will be a graph-wide filter for which continent to display (although Australia will be clumped together with `Western Countries`, along with the US and Canada).

Circle attributes:
 - Size will represent its GDP
 - Color will represent its continent
 
 
![TeacherPay Mockup](https://github.com/brillantewang/teacherpay/blob/master/TeacherPay.png)



