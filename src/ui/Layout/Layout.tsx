import { FC, ReactNode } from 'react';
import classes from './Layout.module.scss';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return <div className={classes.layout}>{children}</div>;
};

export default Layout;
