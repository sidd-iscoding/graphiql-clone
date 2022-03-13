import React , { useState } from 'react';

import PropTypes from 'prop-types';
import Body from './Body'
import { Container,Box,Tabs,Tab,Typography} from '@mui/material';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function App() {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container  maxWidth= "100%"  sx={{mr:0, border: 1,position: "relative",top: 0,bottom: 0}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One"  />
          <Tab label="Item Two"  />
          <Tab label="Item Three"  />
        </Tabs>
      </Box>
      <Body value={selectedTab} index={0}   style={{}}/> 
      <Body value={selectedTab} index={1}/>
      <Body value={selectedTab} index={2}/>
      
      
    </Container>
  );
}

export default App;
