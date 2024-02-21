import { Tooltip, UnstyledButton } from "@mantine/core";
import { useStyles } from "./style";

interface NavbarLinkProps {
  icon?: React.FC<any> | null;
  avatar?: any;
  label: string;
  active?: boolean;
  onClick?(): void;
}

const NavbarLink = ({
  icon: Icon,
  avatar,
  label,
  active,
  onClick,
}: NavbarLinkProps) => {
  const { classes, cx } = useStyles();

  return (
    <Tooltip
      label={label}
      position="top-start"
      offset={-30}
      transitionProps={{ duration: 0 }}
    >
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        {Icon && <Icon size="1.2rem" stroke={1.5} />}
        {avatar}
      </UnstyledButton>
    </Tooltip>
  );
};

export default NavbarLink;
