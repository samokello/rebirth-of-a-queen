import * as React from 'react';
import { List, Datagrid, TextField, EmailField, DateField } from 'react-admin';

export const ProgramsList = (props) => (
  <List resource="programs" {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="motivation" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
); 