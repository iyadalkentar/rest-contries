import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import styles from './header.module.scss';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

/* eslint-disable-next-line */
export interface HeaderProps {
  isDarkMode: boolean;
  onChangeTheme: () => void;
}

export function Header(props: HeaderProps) {
  const {isDarkMode, onChangeTheme} = props;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Where in the world?
          </Typography>
          <Button 
            startIcon={<DarkModeOutlinedIcon />} 
            color="inherit"
            onClick={() => onChangeTheme()}
          >
            {isDarkMode ? 'Light Mode': 'Dark Mode'}
            </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
