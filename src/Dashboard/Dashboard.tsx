/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-quotes */
/* eslint-disable quotes */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Container } from '@material-ui/core/';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Select from 'react-select';
import { useQuery } from 'urql';
import makeAnimated from 'react-select/animated';
import { IState } from '../store';
import { actions } from './MetricsReducer';

const animatedComponents = makeAnimated();

const useStyles = makeStyles((theme: Theme) => createStyles({
  select: {
    padding: theme.spacing(2),
  },
}));

// Graphql Querries
const query = `{
  getMetrics
  }
`;

export interface MultipleMeasurements {
  measurements: Object;
}

const getMetrics = (state: IState) => {
  const { allMetrics, multipleMeasurements, liveData } = state.metrics;
  return {
    allMetrics,
    multipleMeasurements,
    liveData,
  };
};

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [dropDownOptions, setDropDownOptions] = useState([]);
  const { allMetrics } = useSelector(getMetrics);

  const [resultgetMetrics] = useQuery({
    query,
  });

  const handleChange = (selectedOption) => {
    console.log(selectedOption);
  };

  useEffect(() => {
    const tempOptions: any = [];
    allMetrics.forEach((m: any) => {
      tempOptions.push({ value: m, label: m.replace(/([A-Z])/g, ' $1').toUpperCase() });
    });
    setDropDownOptions(tempOptions);
  }, [allMetrics]);

  // Get All Avaliable Metrics
  useEffect(() => {
    const { data, error } = resultgetMetrics;
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error?.message }));
      return;
    }
    if (!data) return;

    dispatch(actions.allMetricsDataRecevied(data));
  }, [dispatch, resultgetMetrics]);

  return (
    <>
      <Container maxWidth="lg">
        <Grid item xs={10} className={classes.select}>
          <Select
            onChange={handleChange}
            closeMenuOnSelect
            components={animatedComponents}
            isMulti
            options={dropDownOptions}
          />
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
