import { Avatar, Box, Button, Card, CardContent, Typography } from '@mui/material'
import React from 'react'

const BasicCards = () => {
  return (
    <Box>
      {/* Team Birthday Card */}
      <Card sx={{ backgroundColor: "#212529", color: "white", marginBottom: 2, height: "231px" }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography fontSize={16} fontWeight={600} color={"white"} mb={2}>
            Team Birthday
          </Typography>
          <Avatar
            alt="Andrew Jermia"
            src="/images/avatars/8.png"
            sx={{
              width: 57,
              height: 57,
              margin: "0 auto 16px",
            }}
          />
          <Typography fontSize={14} fontWeight={500} color={"white"}>
            Andrew Jermia
          </Typography>
          <Typography variant="body2" mb={2} fontSize={12} color={'white'}>
            IOS Developer
          </Typography>
          <Button variant="contained" size="small" color="primary" sx={{ fontSize: 12, textTransform: 'capitalize', fontWeight: 500 }}>
            Send Wishes
          </Button>
        </CardContent>
      </Card>

      {/* Leave Policy Card */}
      <Card sx={{ backgroundColor: "#3B7080", color: "white", marginBottom: 2 }}>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: '20px 10px',
            pb: '20px !important',
            height: "111px"
          }}
        >
          <Box>
            <Typography fontSize={16} fontWeight={600} mb={1} color={'white'}>
              Leave Policy
            </Typography>
            <Typography variant="body2" fontSize={12} color={'white'}>Last Updated: Today</Typography>
          </Box>
          <Button variant="outlined" size="small" color="inherit"
            sx={{
              fontSize: '11px',
              textTransform: 'capitalize',
              fontWeight: 600,
              color: "white"
            }}
          >
            View All
          </Button>
        </CardContent>
      </Card>

      {/* Next Holiday Card */}
      <Card sx={{ backgroundColor: "#FFC107", color: "black" }}>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: '20px 10px',
            pb: '20px !important',
            height: "111px"
          }}
        >
          <Box>
            <Typography fontSize={16} fontWeight={600} mb={1}>
              Next Holiday
            </Typography>
            <Typography variant="body2" fontSize={12} color={"black"}>
              Diwali, 15 Sep 2025
            </Typography>
          </Box>
          <Button
            variant="outlined"
            size="small"
            color="inherit"
            sx={{
              fontSize: '11px',
              textTransform: 'capitalize',
              fontWeight: 600,
            }}
          >
            View All
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}

export default BasicCards
