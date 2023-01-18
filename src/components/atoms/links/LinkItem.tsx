import './index.css';
import { Link } from 'react-router-dom';
import { FC } from 'react';

/**
 * A comment
 */
export interface LinkProps
    extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
    label: string;
    to: Partial<Location> | string;
    reloadDocument?: boolean;
    replace?: boolean;
    state?: any;
}

/**
 * @component Component for a link item.
 * @example
 * <a className="link" href="#">
 *   My label
 * </a>
 * @param {props: <linksProps>}
 * @returns {JSX.Element}
 */
export const LinkItem = ({ to, label }: LinkProps) => {
    return (
        <Link className="link" to={to}>
            {label}
        </Link>
    );
};
