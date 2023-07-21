import { Box } from "@chakra-ui/react";

interface ImageBackgroundProps {
  children: React.ReactNode;
}

const ImageBackgroundComponent: React.FC<ImageBackgroundProps> = ({ children }) => {
  return (
    <Box
      backgroundImage="/wave_flow.png"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </Box>
  );
};

export default ImageBackgroundComponent;