import React from 'react';
import StatsLine from './StatsLine';

const Stats = ({ stats }) => {
    let calc = (
        <tbody>
            <StatsLine text="Good" value={stats.good} />
            <StatsLine text="Neutral" value={stats.neutral} />
            <StatsLine text="Bad" value={stats.bad} />
            <tr><td>No Feedback Given</td></tr>
        </tbody>
    )
    let statsBool = (stats.good + stats.neutral + stats.bad) === 0;

    if (!statsBool) {
        calc = (
            <tbody>
                <StatsLine text="Good" value={stats.good} />
                <StatsLine text="Neutral" value={stats.neutral} />
                <StatsLine text="Bad" value={stats.bad} />
                <tr><td>All: </td><td>{total()}</td></tr>
                <tr><td>Average: </td><td>{calcAvg()}</td></tr>
                <tr><td>Positive: </td><td>{calcPos()}</td></tr>
            </tbody>
        )
    }

    function total() {
        const total = stats.good + stats.neutral + stats.bad;
        return total;
    }

    function calcAvg() {
        const score = ((1 * stats.good) + (0 * stats.neutral) + (-1 * stats.bad)) / (stats.good + stats.neutral + stats.bad);
        return score;
    }

    function calcPos() {
        const score = stats.good / (stats.good + stats.neutral + stats.bad) * 100;
        return score;
    }

    return (
        <div>
            <h3>Statistics</h3>
            <table>
                {calc}
            </table>
        </div>
    );
}

export default Stats;