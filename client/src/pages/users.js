import * as React from 'react';
import { List, Datagrid, TextField, EmailField, Edit, SimpleForm, TextInput, Create } from 'react-admin';

export const UserList = (props) => (
  <List resource="users" {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      {/* Add more fields as needed */}
    </Datagrid>
  </List>
);

export const UserEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      {/* Add more fields as needed */}
    </SimpleForm>
  </Edit>
);

export const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      {/* Add more fields as needed */}
    </SimpleForm>
  </Create>
); 