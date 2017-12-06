# TeacherPay
An analysis on teacher salaries to student outcomes across the world.

## Background and Overview
As a former teacher, I had heard at some point that countries that paid their teachers the highest salaries also had the best overall education systems, which implied best student achievement.

This project will be a way to confirm if that is true by analyzing data provided by the Organization for Economic Cooperation and Development (OECD). TeacherPay will be a simple and beautiful visual tool that shows the relationship between teacher pay and student outcomes in science, math, and reading across the 35 countries that are members of the OECD.

At the most basic level, users will be presented a graph with teacher salaries on the X axis and student outcomes on the Y axis. To break down what these components mean:

### Student Outcomes
This will represent the mean score on the Programme for International Student Assessment (PISA), an international survey which aims to evaluate education systems worldwide by testing the skills and knowledge of 15-year-old students. Users will be able to toggle between different PISA assessments such as science, math, and reading.

I have not decided if this will be shown as a percentile or absolute score yet.

### Teacher Salaries
This will represent the mean annual statutory teacher salary in public institutions converted to USD using Purchasing Power Parity (PPP) for teachers with 15 years of teaching experience. Users will be able to toggle between different types of teachers such as upper secondary and primary school teachers.

## Functionality & MVP

Countries will be represented by colored circles.

Upon initialization:

- [ ] Countries will float onto the graph one by one to their respective positions starting from the bottom-left corner to the top-right corner at an accelerating rate.

Users will be able to:

- [ ] Checkbox different continents and see countries fade in or out.
- [ ] Toggle between different PISA assessments (science, math, reading) on the Y axis and see countries float to their new positions.
- [ ] Toggle between different teacher types (primary, lower secondary, upper secondary) on the X axis and see countries float to their new positions.
- [ ] Click on a country so that it expands and shows specific data points such as teacher salary, PISA mean score, and bonus info such as classroom size.

Bonus:
- [ ] Users will be able to click and drag a country around and have it bounce back to its original position upon letting go.

## Wireframes

TeacherPay will show a single graph populated with circles representing different countries. There will be a graph-wide filter for which continent to display (although Australia will be clumped together with `Western Countries`, along with the US and Canada).

Circle attributes:
 - Size will represent its GDP
 - Color will represent its continent

![TeacherPay Mockup](https://github.com/brillantewang/teacherpay/blob/master/TeacherPay.png)

## Architecture & Technologies

The teacher salary and student performance data for this project will be provided by the OECD.
- [Teacher Salary Data](http://stats.oecd.org/viewhtml.aspx?datasetcode=EAG_TS_STA&lang=en#)
- [Student Performance Data](http://gpseducation.oecd.org/IndicatorExplorer?query=2&indicators=S000*S019*S004*S003*S002*N058*N059*S007*S008*S090*S006*S009*S010*S011*S012*S082*S083*S084*S085*S086*S087*S088*S089*N100*N101*N109*N110*N111*N112*N113*N114*N115*N116*N117*N118*N119*N120*N121*N122*N123*N124*N103*N106*N104*N107*S033*S052*N105*N108*N102*R000*R004*R003*R002*R007*R008*R090*R006*R009*R010*R011*R012*M000*M004*M003*M002*M007*M008*M090*M006*M009*M010*M011*M012*X019*X020*X021*X022*X023*X025*X026*X027*X028*X029*N090*N177*N178*N179*N180*N181*N091*S013*S091*S092*S014*S093*S094*S060*S053*S054*S055*S056*S057*S058*S059*R054*R055*R056*R057*R058*M057*M058*M054*M055*M056*M057*M058*S061*S062*S063*S064*S065*S066*R061*R062*R063*R064*R065*R066*M061*M062*M063*M064*M065*M066*S067*S068*S069*S070*S071*S072*S073*S074*S075*S015*S016*R073*R074*R075*M073*M074*M075*N093*N092*N001*N094*N095*N096*N097*S076*S077*S078*S079*N098*N099*S080*S081*S017*S018*N076*N062*N063*S026*S027*N137*N138*N139*N140*N010*N011*N141*N142*N125*N143*N144*S029*N145*N126*S040*S042*N146*N147*N148*N149*N150*N151*N152*N153*N154*N155*N156*N129*N019*N017*N018*N081*N158*N157*N159*N127*N128*N162*N163*N161*N164*N165*N166*N167*N168*N169*N170*N171*N172*N160*N173*N008*N020*N130*N131*N132*N133*N134*N135*N136*N009*N174*N175*N176)

GDP data is provided by the United Nations at [GDP Data](https://unstats.un.org/unsd/snaama/dnlList.asp)

This project will be implemented with the following technologies:

- Vanilla JavaScript for overall structure
- D3.js for DOM manipulation and data visualization
- Webpack to bundle and serve up scripts

In addition to the webpack entry file, there will be:

- `country.js`: This script will handle the visual/interaction logic for a country bubble.
- `graph.js`: This script will handle the overall logic for countries floating onto the graph in response to toggling between filters.

## Implementation Timeline
### Day 1:
Set up configuration by creating `webpack.config` and `package.json`. Write a basic entry file and skeleton for the two additional scripts. Goals for the day:

- [ ] Get webpack running and create index.html skeleton
- [ ] Learn enough D3 to create basic visualizations with OECD data.
- [ ] Render a circle using D3.

### Day 2:
Create basic visualization logic for country circles in `country.js` and basic movement logic in `graph.js`. Goals:

- [ ] Have circle size a function of GDP
- [ ] Have cicle color a function of their continent
- [ ] Create graph skeleton in `graph.js`
- [ ] Have circles float to their positions in `graph.js`

### Day 3:
Add filters and flesh out `country.js`

- [ ] Add filter logic to `graph.js` so countries float to their correct positions depending on filter
- [ ] Add checkboxes for continent and logic for countries to fade in or out to `graph.js`
- [ ] Add logic to `country.js` allowing circle to expand with `click` event handler and show additional information

### Day 4:
Create initialization animation in `graph.js`

- [ ] Add animation logic to `graph.js` so that countries float to their correct position at an accelerated rate upon initialization

If there is time:
- [ ] Add logic to `graph.js` allowing user to click and drag circle before letting go and having it float back to original position
