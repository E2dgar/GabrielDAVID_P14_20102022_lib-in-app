import './index.css';
import { Link } from 'react-router-dom';

/**
 * A comment
 */
export interface LinkProps
    extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
    /** label displayed on UI */
    label: string;
    /**href page link */
    to: Partial<Location> | string;
    reloadDocument?: boolean;
    replace?: boolean;
    state?: any;
}

/**
 * @component Component for a link item.
 * @param {{props: <LinkProps>}}
 * @example
 * <a className="link" href="#">
 *   My label
 * </a>
 */
export const LinkItem = ({ to, label }: LinkProps): JSX.Element => {
    return (
        <Link className="link" to={to}>
            {label}
        </Link>
    );
};
