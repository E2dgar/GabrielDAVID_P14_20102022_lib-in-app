import './index.css';
import { Link } from 'react-router-dom';
import { FC } from 'react';

/**
 * A comment
 */
export interface LinkProps
    extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
    replace?: boolean;
    state?: any;
    to: Partial<Location> | string;
    reloadDocument?: boolean;
    label: string /*Label displayd*/;
}

/**
 * Link component
 * @param {{label: string}} - The label displayed on UI
 * @returns {JSX.Element}
 */
export const LinkItem: FC<LinkProps> = ({ to, label }) => {
    return (
        <Link className="link" to={to}>
            {label}
        </Link>
    );
};
