import { MantineProvider } from '@mantine/core';
import { Children, ReactNode } from 'react';

// const theme = createTheme({
//   /** Put your mantine theme override here */
// });

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MantineProvider>
      { children }
    </MantineProvider>
  );
}