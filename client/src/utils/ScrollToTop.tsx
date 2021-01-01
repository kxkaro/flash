import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Children } from '../logic/types';

interface Props {
    children: Children,
    location: { pathname: string },
}

const ScrollToTop: any = ({ children, location: { pathname } }: Props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return children;
};

// export default withRouter(ScrollToTop);
export default withRouter(ScrollToTop);
