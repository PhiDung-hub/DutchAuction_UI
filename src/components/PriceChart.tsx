"use client"

import React, { useMemo, useCallback } from 'react';
import { AreaClosed, Line, Bar } from '@visx/shape';
import { curveStep } from '@visx/curve';
import { GridRows, GridColumns } from '@visx/grid';
import { scaleTime, scaleLinear } from '@visx/scale';
import { withTooltip, Tooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip';
import { localPoint } from '@visx/event';
import { LinearGradient } from '@visx/gradient';
import { max, extent, bisector, min } from '@visx/vendor/d3-array';
import { AxisLeft, AxisBottom } from '@visx/axis';

import { ETHER_SYMBOL } from '~/lib/constants';
import { formatDate, formatFloat } from '~/lib/format';


// NOTE: chart colors
export const background = '#204051';
export const background2 = '#1c2936';

export const accentColor = "rgba(237, 255, 235, 0.4)";
export const accentColorInactive = "rgba(237, 255, 235, 0.05)";

const tooltipStyles = {
  ...defaultStyles,
  background,
  border: '1px solid rgba(255, 255, 255, 0.3)',
  color: 'white',
};

// Interface && Accessors
type TooltipData = {
  date: string;
  price: number;
};

const strokeColor = "rgba(255, 255, 255, 0.2)"
const labelColor = "rgba(255, 255, 255, 0.7)"

const getX = (data_point: TooltipData) => new Date(data_point.date);
const getY = (data_point: TooltipData) => data_point.price;
const bisect = bisector<TooltipData, Date>((data_point) => new Date(data_point.date)).left;

const demoData = [...Array(100).keys()].map((val, idx) => ({
  date: new Date(Date.now() + 12_000 * idx).toISOString(),
  price: 0.024 - Math.floor(val / 5) * 0.001,
}))

export type AreaProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export type Data = {
  data?: TooltipData[];
  title?: string,
  xLabel?: string,
  activeIndex?: number | null,
  yLabel?: string
};

export default withTooltip<AreaProps & Data, TooltipData>(
  ({
    // chart layout
    width,
    height,
    margin = { top: 16, right: 16, bottom: 56, left: 80 },
    // data
    data = demoData,
    title = "Auction Price: 1000 * X",
    xLabel = `Block timestamp`,
    yLabel = `Price in ${ETHER_SYMBOL}`,
    activeIndex = null,
    // tooltips info
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
  }: AreaProps & Data & WithTooltipProvidedProps<TooltipData>) => {
    if (width < 10) return null;

    // bounds
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // scales
    const XScale = useMemo(
      () =>
        scaleTime({
          range: [margin.left, innerWidth + margin.left],
          domain: extent(data, getX) as [Date, Date],
        }),
      [innerWidth, margin.left],
    );

    const YScale = useMemo(
      () =>
        scaleLinear({
          range: [innerHeight + margin.top, margin.top],
          // domain: extent(data, getY) as [number, number],
          domain: [min(data, getY) || 0, (max(data, getY) || 0)],
          nice: true,
        }),
      [margin.top, innerHeight],
    );

    // tooltip handler
    const handleTooltip = useCallback(
      (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
        const { x } = localPoint(event) || { x: 0 };
        const x0 = XScale.invert(x);
        const index = bisect(data, x0, 1);
        const d0 = data[index - 1];
        const d1 = data[index];
        let d = d0;
        if (d1 && getX(d1)) {
          d = x0.valueOf() - getX(d0).valueOf() > getX(d1).valueOf() - x0.valueOf() ? d1 : d0;
        }
        showTooltip({
          tooltipData: d,
          tooltipLeft: x,
          tooltipTop: YScale(getY(d)),
        });
      },
      [showTooltip, YScale, XScale],
    );

    const activeDataPoint = (activeIndex === null || activeIndex < 0 || activeIndex >= data.length - 1) ? null : data[activeIndex];

    return (
      <div className="flex flex-col items-center">
        <svg width={width} height={height} className="rounded-xl">
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="url(#area-background-gradient)"
          />

          {/* <LinearGradient id="area-background-gradient" from={background} to={background2} /> */}
          <LinearGradient id="area-gradient" from={accentColor} to={accentColor} toOpacity={0.1} />
          <LinearGradient id="area-gradient-inactive" from={accentColorInactive} to={accentColorInactive} toOpacity={0.1} />

          <GridRows
            left={margin.left}
            scale={YScale}
            width={innerWidth}
            strokeDasharray="1,3"
            stroke={accentColor}
            strokeOpacity={0.1}
            pointerEvents="none"
          />

          <GridColumns
            top={margin.top}
            scale={XScale}
            height={innerHeight}
            strokeDasharray="1,3"
            stroke={accentColor}
            strokeOpacity={0.1}
            pointerEvents="none"
          />

          <AreaClosed<TooltipData>
            data={data.slice(0, activeIndex ? activeIndex + 1 : undefined)}
            x={(d) => XScale(getX(d)) ?? 0}
            y={(d) => YScale(getY(d)) ?? 0}
            yScale={YScale}
            strokeWidth={1}
            stroke="url(#area-gradient)"
            fill="url(#area-gradient)"
            curve={curveStep}
          />

          <AreaClosed<TooltipData>
            data={data.slice(activeIndex ?? undefined)}
            x={(d) => XScale(getX(d)) ?? 0}
            y={(d) => YScale(getY(d)) ?? 0}
            yScale={YScale}
            strokeWidth={1}
            stroke="url(#area-gradient-inactive)"
            fill="url(#area-gradient-inactive)"
            curve={curveStep}
          />

          <AxisBottom
            top={innerHeight + margin.top} scale={XScale}
            stroke={strokeColor} tickStroke={strokeColor}
            tickLabelProps={{ fill: labelColor, fontSize: 12 }}
            labelProps={{ fill: labelColor, fontSize: 16, fontWeight: "bold", x: margin.left + (innerWidth) / 2, textAnchor: "middle" }}
            label={xLabel}
          />
          <AxisLeft
            left={margin.left} scale={YScale}
            stroke={strokeColor} tickStroke={strokeColor}
            tickLabelProps={{ fill: labelColor, fontSize: 12 }}
            labelProps={{ fill: labelColor, fontSize: 16, fontWeight: "bold", x: -margin.top - innerHeight / 2, y: -margin.left + 28, textAnchor: "middle" }}
            label={yLabel}
          />

          <text
            x={margin.left + innerWidth / 2} y={margin.top + 32} textAnchor="middle"
            fontFamily="Arial" fontSize={20} fontWeight="600"
            fill={"rgba(255, 255, 255, 0.8)"}
          >
            {title}
          </text>

          <Bar
            x={margin.left}
            y={margin.top}
            width={innerWidth}
            height={innerHeight}
            fill="transparent"
            rx={14}
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />

          {activeDataPoint && (
            <circle
              cx={XScale(getX(activeDataPoint))}
              cy={YScale(getY(activeDataPoint))}
              r={4}
              pointerEvents="none"
              className="animate-pulse fill-red-500 stroke-white/50 stroke-1"
            />
          )}


          {tooltipData && (
            <g aria-label="tooltip line">
              <Line
                from={{ x: tooltipLeft, y: margin.top }}
                to={{ x: tooltipLeft, y: innerHeight + margin.top }}
                pointerEvents="none"
                strokeDasharray="5,2"
                className="stroke-2 stroke-v3-primary/70"
              />
              <circle
                aria-label="dot trail"
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                className="fill-black/10 stroke-black/10 stroke-1"
                strokeWidth={1}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                className="fill-green-500 stroke-white/80 stroke-1"
                pointerEvents="none"
              />
            </g>
          )}

        </svg>

        {tooltipData && (
          <div aria-label="tooltip info">
            <TooltipWithBounds
              key={Math.random()}
              top={tooltipTop - 12}
              left={tooltipLeft - 80}
              style={tooltipStyles}
            >
              {`${formatFloat(getY(tooltipData))} ${ETHER_SYMBOL}`}
            </TooltipWithBounds>
            <Tooltip
              top={innerHeight + margin.top - 14}
              left={tooltipLeft - 80}
              style={{
                ...defaultStyles,
                minWidth: 160,
                textAlign: 'center',
                transform: 'translateX(-50%)',
              }}
            >
              {formatDate(getX(tooltipData))}
            </Tooltip>
          </div>
        )}

      </div>
    );
  },
);
