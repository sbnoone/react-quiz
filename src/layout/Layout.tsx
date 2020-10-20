import React from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

import {
  AppBar,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import HomeIcon from '@material-ui/icons/Home'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import { RootState } from '../redux/rootReducer'
import { AuthState } from '../redux/modules/auth'

interface INavLink {
  label: string
  href: string
  icon: React.ReactElement
}

const Layout: React.FC = ({ children, classes, theme }: any): React.ReactElement => {
  const [open, setOpen] = React.useState<boolean>(false)
  const isAuthenticated: boolean = Boolean(useSelector((state: RootState): AuthState => state.auth).token)

  const navLinks: INavLink[] = [{ label: 'Главная', href: '/', icon: <HomeIcon /> }]

  if (isAuthenticated) {
    navLinks.push({ label: 'Создать опрос', href: '/create', icon: <AddCircleOutlineIcon /> })
    navLinks.push({ label: 'Выйти', href: '/logout', icon: <ExitToAppIcon /> })
  } else {
    navLinks.push({ label: 'Вход', href: '/signin', icon: <ExitToAppIcon /> })
  }

  const toggleDrawerOpen = (): void => {
    setOpen(prev => !prev)
  }

  return (
    <Grid container>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='fixed'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={toggleDrawerOpen}
              edge='start'
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' noWrap>
              React-Quiz
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          variant='permanent'
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={toggleDrawerOpen}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {navLinks.map(link => (
              <ListItem button key={link.label}>
                <Link className={classes.listLink} to={link.href}>
                  <Tooltip title={link.label}>
                    <ListItemIcon>{link.icon}</ListItemIcon>
                  </Tooltip>
                  <ListItemText primary={link.label} />
                </Link>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Container className={classes.content} component='main'>
          {children}
        </Container>
      </div>
    </Grid>
  )
}

export default Layout
