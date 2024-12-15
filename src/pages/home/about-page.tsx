import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

export const authors = [
  {
    id: 1,
    name: "H.T.Thy Giang",
    avatar:
      "https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-1/412869523_3623038977970904_7784186731189332809_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=k57lAvoZG9QQ7kNvgFxEDSp&_nc_zt=24&_nc_ht=scontent.fsgn5-12.fna&_nc_gid=AjwPtOacylw-iPbgbT3K7YP&oh=00_AYBqIMschLM45kjJWvRJTb3IcqE0WPkNgd09alQsOk52Bw&oe=676456CC",
    position: "Landlord",
    role: "Leader & Frontend",
  },
  {
    id: 2,
    name: "P. Gia Phúc",
    avatar: "https://avatar.iran.liara.run/username?username=GiaPhuc+Pham",
    position: "Slave",
    role: "Fullstack",
  },
  {
    id: 3,
    name: "V. Gia Ân",
    avatar: "https://avatar.iran.liara.run/username?username=GiaAn+Vo",
    position: "Slave",
    role: "Backend",
  },
  {
    id: 4,
    name: "N.Nam Hưng",
    avatar: "https://avatar.iran.liara.run/username?username=NamHung+Ngo",
    position: "Slave",
    role: "Backend",
  },
  {
    id: 5,
    name: "N.H. Thảo Trinh",
    avatar: "https://avatar.iran.liara.run/username?username=ThaoTrinh+Nguyen",
    position: "Slave",
    role: "UI/UX and Tester",
  },
  {
    id: 6,
    name: "H.N. Quỳnh Anh",
    avatar: "https://avatar.iran.liara.run/username?username=QuynhAnh+Hoang",
    position: "Slave",
    role: "UI/UX and Tester",
  },
  {
    id: 7,
    name: "N.Trọng Thuận",
    avatar:
      "https://scontent.fsgn5-13.fna.fbcdn.net/v/t1.15752-9/466959832_461863680289188_3803473891099350360_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeGtznGjRru9iw6r-6juSrcSxrVI9FraAfbGtUj0WtoB9rZJbUuRwQ2KtWfje0WmGH-bfcYGZwj-4gwEeLmczcVm&_nc_ohc=ilHW7dHhn6UQ7kNvgHP0U44&_nc_zt=23&_nc_ht=scontent.fsgn5-13.fna&oh=03_Q7cD1QGSwDV0NVyF7A7BUwX0ju-yr2SKEc6jgpeD3qcz3QDM-w&oe=67866AAA",
    position: "Slave",
    role: "Frontend",
  },
  {
    id: 8,
    name: "N.V. Phương Nghi",
    avatar: "https://avatar.iran.liara.run/username?username=PhuongNghi+Nguyen",
    position: "Slave",
    role: "Business Analyst",
  },
  {
    id: 9,
    name: "D.T. Quỳnh Như",
    avatar: "https://avatar.iran.liara.run/username?username=QuynhNhu+Duong",
    position: "Slave",
    role: "Business Analyst",
  },
];

const AboutPage = () => {
  const [expandId, setExpandId] = useState<string>("faq-1");
  return (
    <Stack sx={{ padding: 4 }} gap={4}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          FAQs
        </Typography>
        <Stack>
          <Accordion
            expanded={expandId === "faq-1"}
            onChange={() => setExpandId("faq-1")}
          >
            <AccordionSummary sx={{ fontWeight: 500 }}>
              1. What is Scholaro?
            </AccordionSummary>
            <AccordionDetails>
              Scholaro is an e-learning platform focused on delivering courses
              specialized in technology fields effectively and interactively.
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expandId === "faq-2"}
            onChange={() => setExpandId("faq-2")}
          >
            <AccordionSummary sx={{ fontWeight: 500 }}>
              2. How can we join courses in Scholaro?
            </AccordionSummary>
            <AccordionDetails>
              You can join courses by signing up on our website, browsing the
              course catalog, and enrolling in the course that interests you.
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expandId === "faq-3"}
            onChange={() => setExpandId("faq-3")}
          >
            <AccordionSummary sx={{ fontWeight: 500 }}>
              3. Why choose Scholaro?
            </AccordionSummary>
            <AccordionDetails>
              Scholaro stands out with its interactive learning modules, expert
              instructors, and a strong focus on technology-oriented fields,
              ensuring quality education.
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          Our Scholaro authors
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {authors.map((author) => (
            <Box
              key={author.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Avatar
                alt={author.name}
                src={author.avatar}
                sx={{
                  height: 110,
                  width: 110,
                  mb: 2,
                }}
              />
              <Typography>
                {author.name} - {author.position}
              </Typography>
              <Typography>{author.role}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Stack>
  );
};

export default AboutPage;
