import * as React from 'react';
import { List, Datagrid, TextField, NumberField, DateField } from 'react-admin';

export const DonationList = (props) => (
  <List resource="donations" {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="donorName" />
      <NumberField source="amount" />
      <DateField source="date" />
      {/* Add more fields as needed */}
    </Datagrid>
  </List>
); 