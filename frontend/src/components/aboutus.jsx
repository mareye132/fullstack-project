import React from "react";
import { Box, Typography } from "@mui/material";

const AboutUs = () => {
  return (
    <Box
      sx={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", // Align the content to the start
        height: "auto", // Let content flow naturally
        backgroundColor: "#f4f4f4",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        About Injibara University
      </Typography>

      <Typography
        variant="body1"
        paragraph
        sx={{
          fontSize: "1.2rem",
          fontWeight: 400,
          lineHeight: 1.8,
          textAlign: "justify", // Ensure the text is justified
          letterSpacing: "0.02em",
          maxWidth: "900px", // Control text width for better readability
          marginBottom: "1.5rem", // Increased margin for paragraph spacing
        }}
      >
        Ethiopia opted to expand higher education, on the premise that education is a weapon to eradicate poverty. In recognition of this fundamental principle, 11 new universities have been established in the second Growth and Transformation Plan (GTP II). Injibara University was established as one of these universities. The cornerstone of the university was laid down on the 8th February 2015 in the presence of His Excellency Demeke Mekonnen, Deputy Prime Minister of the Federal Democratic Republic of Ethiopia. It was officially established by the Council of Ministers on 4th November 2015.
      </Typography>

      <Typography
        variant="body1"
        paragraph
        sx={{
          fontSize: "1.2rem",
          fontWeight: 400,
          lineHeight: 1.8,
          textAlign: "justify",
          letterSpacing: "0.02em",
          maxWidth: "900px",
          marginBottom: "1.5rem",
        }}
      >
        Injibara University is situated in Awi Zone, which is one of the 10 administrative zones of Amhara National Regional State. The zone is bordered on the west by Metekel Zone, on the north by North Gondar Zone, and on the east by West Gojam. The name of the university has been picked from the name of the administrative town center of Awi Zone. The people of Awi have traditionally practiced a land-management system that is well adapted to the local ecology, which enables them to sustain fertility and minimize erosion of the soil. The area is recognized as one of the most productive areas in the region.
      </Typography>

      <Typography
        variant="body1"
        paragraph
        sx={{
          fontSize: "1.2rem",
          fontWeight: 400,
          lineHeight: 1.8,
          textAlign: "justify",
          letterSpacing: "0.02em",
          maxWidth: "900px",
          marginBottom: "1.5rem",
        }}
      >
        Injibara University intends to produce competent graduates who can respond to resilient green economy initiatives of the Government of Ethiopia and beyond. The green campus, energy, and curriculum will be the brand of the university. The curriculums shall be oriented to support the green economy initiatives and entrepreneurial development. The university is well situated and endowed with high rainfall that extends for more than six months, fertile soil, continuous water supply, and green mountains. Hence, integrating the learning-teaching, research, and community service activities with natural resource conservation and advancement of green initiatives is of paramount importance.
      </Typography>

      <Typography
        variant="body1"
        paragraph
        sx={{
          fontSize: "1.2rem",
          fontWeight: 400,
          lineHeight: 1.8,
          textAlign: "justify",
          letterSpacing: "0.02em",
          maxWidth: "900px",
          marginBottom: "1.5rem",
        }}
      >
        The university has, within its five-year period, realized tremendous achievements in academic program expansion, research, community engagement, administrative issues, partnership, and greenery. In the 2021/22 academic year, the university has been running the teaching and learning process, having about 15,000 students and 460 academic staff members within six colleges and one school. Currently, the university offers 54 undergraduate and 43 postgraduate programs.
      </Typography>
    </Box>
  );
};

export default AboutUs;
