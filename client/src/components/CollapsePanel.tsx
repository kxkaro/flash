import React from 'react';
import Collapse from '@material-ui/core/Collapse';
import { Children } from '../logic/types';

interface Props {
    expanded: boolean;
    children: Children;
}

// TODO: fix the warning about children
const SimpleCollapse = ({ expanded, children }: Props) => <aside>
        <>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {children}
            </Collapse>
        </>
    </aside>

export default SimpleCollapse;
