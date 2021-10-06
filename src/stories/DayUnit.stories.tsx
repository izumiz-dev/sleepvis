import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Duration } from "luxon";

import { DayUnit } from "../components/visualize/DayUnit";

export default {
  title: "Sleepvis/DayUnit",
  component: DayUnit,
} as ComponentMeta<typeof DayUnit>;

const Template: ComponentStory<typeof DayUnit> = (args) => (
  <DayUnit {...args} />
);

export const DurationTime10h40m = Template.bind({});
DurationTime10h40m.args = {
  duration: Duration.fromObject({ hours: 10, minutes: 40 }),
};

export const DurationTime6h30m = Template.bind({});
DurationTime6h30m.args = {
  duration: Duration.fromObject({ hours: 6, minutes: 30 }),
};

export const DurationTime5h = Template.bind({});
DurationTime5h.args = {
  duration: Duration.fromObject({ hours: 5 }),
};

export const DurationTime2h0m = Template.bind({});
DurationTime2h0m.args = {
  duration: Duration.fromObject({ hours: 2, minutes: 0 }),
};

export const DurationEmpty = Template.bind({});
DurationEmpty.args = {
  duration: "Nodata",
};
