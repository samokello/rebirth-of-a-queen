import * as React from 'react';
import { List, Datagrid, NumberField, DateField, TextField } from 'react-admin';

export const AnalyticsList = (props) => (
  <List resource="analytics" {...props}>
    <Datagrid>
      <TextField source="id" />
      <NumberField source="amount" />
      <TextField source="paymentMethod" />
      <TextField source="status" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
); 