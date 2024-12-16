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
import GPhucLogo from "@/assets/authors/gphuc.jpg";
import GAnLogo from "@/assets/authors/giaan.jpg";
import TTrinhLogo from "@/assets/authors/trinh.jpg";
import QAnhLogo from "@/assets/authors/qanh.jpg";
import ThuanLogo from "@/assets/authors/thuan.jpg";
import PNghiLogo from "@/assets/authors/pnghi.jpg";
import TGiangLogo from "@/assets/authors/tgiang.jpg";

export const authors = [
  {
    id: 1,
    name: "H.T.Thy Giang",
    avatar: TGiangLogo,
    position: "Landlord",
    role: "Leader & Frontend",
  },
  {
    id: 2,
    name: "P. Gia Phúc",
    avatar: GPhucLogo,
    position: "Slave",
    role: "Fullstack",
  },
  {
    id: 3,
    name: "V. Gia Ân",
    avatar: GAnLogo,
    position: "Slave",
    role: "Backend",
  },
  {
    id: 4,
    name: "N.Nam Hưng",
    avatar:
      "https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/461175989_938763618295503_5294032240523887856_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=4IcK_hxu9LgQ7kNvgFHbC7b&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=AJG4F07MYcF70s0QQonRXTq&oh=00_AYDyINY7odzEToLHaGeKkZ8qluX7g1VH-VqK5GzoNTCSbw&oe=67661BF3",
    position: "Slave",
    role: "Backend",
  },
  {
    id: 5,
    name: "N.H. Thao Trinh",
    avatar: TTrinhLogo,
    position: "Slave",
    role: "UI/UX and Tester",
  },
  {
    id: 6,
    name: "H.N. Quynh Anh",
    avatar: QAnhLogo,
    position: "Slave",
    role: "UI/UX and Tester",
  },
  {
    id: 7,
    name: "N.Trong Thuan",
    avatar: ThuanLogo,
    position: "Slave",
    role: "Frontend",
  },
  {
    id: 8,
    name: "N.V. Phuong Nghi",
    avatar: PNghiLogo,
    position: "Slave",
    role: "Business Analyst",
  },
  {
    id: 9,
    name: "D.T. Quynh Nhu",
    avatar:
      "https://scontent.fsgn5-8.fna.fbcdn.net/v/t1.6435-9/74366038_147174976568237_124183971431972864_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=nCfPBAP91iMQ7kNvgEBmRUY&_nc_zt=23&_nc_ht=scontent.fsgn5-8.fna&_nc_gid=AW0veA1g1wWZLJvJwbdpHlZ&oh=00_AYAhXdbfSUASxzKlpXQOSNrUn_tNkEMrDGUWSCN5-M7KcQ&oe=67878DB9",
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
            gap: 16,
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
                  height: 140,
                  width: 140,
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
