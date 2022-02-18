import { eachDayOfInterval, format } from "date-fns";
import { IDayProps, IMarkedDateProps } from ".";
import theme from "../../styles/theme";
import { getPlatformDate } from "../../utils/getPlatformDate";

export function generateInterval(start: IDayProps, end: IDayProps) {
  let interval: IMarkedDateProps = {};

  eachDayOfInterval({
    start: new Date(start.timestamp),
    end: new Date(end.timestamp),
  }).forEach((item) => {
    const date = format(getPlatformDate(item), "yyy-MM-dd");

    interval = {
      ...interval,
      [date]: {
        color:
          start.dateString === date || end.dateString === date
            ? theme.colors.main.main
            : theme.colors.main.light,

        textColor:
          start.dateString === date || end.dateString === date
            ? theme.colors.main.light
            : theme.colors.main.main,
      },
    };
  });

  return interval;
}
