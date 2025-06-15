/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ComponentProps } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type AuthLinkProps =
  | ({ intercept?: true } & ComponentProps<typeof Link>)
  | ({ intercept: false; href: string } & ComponentProps<'a'>);

const AuthLink = (props: AuthLinkProps) => {
  const allowIntercept = props.intercept !== false;

  if (allowIntercept) {
    const { intercept, ...rest } = props;

    return (
      <Button variant="link" size="sm" className="px-0 font-medium" asChild>
        <Link replace {...rest} />
      </Button>
    );
  }

  const { href, intercept, ...rest } = props;

  return (
    <Button variant="link" size="sm" className="px-0 font-medium" asChild>
      <a tabIndex={0} onClick={() => console.log('redirect')} {...rest} />
    </Button>
  );
};

export default AuthLink;
