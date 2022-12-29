import './index.css';
import { Link } from 'react-router-dom';
import { FC } from 'react';

export interface LinkProps
    extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
    replace?: boolean;
    state?: any;
    to: Partial<Location> | string;
    reloadDocument?: boolean;
    label: string;
}

export const LinkItem: FC<LinkProps> = ({ to, label }) => {
    return (
        <Link className="link" to={to}>
            {label}
        </Link>
    );
};
