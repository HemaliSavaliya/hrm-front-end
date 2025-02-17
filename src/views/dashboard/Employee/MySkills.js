import { Box, Card, Typography, Divider, CircularProgress } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';

// A custom CircularProgress component with percentage overlay
const SkillProgress = ({ value, label, updated, color }) => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={value !== value.length - 1 ? 2 : 0}
            p={2}
            border={1}
            borderColor="divider"
            borderRadius={2}
            sx={{ bgcolor: 'action.hover' }}
        >
            {/* Skill Info */}
            <Box display="flex" alignItems="center">
                <Box
                    sx={{
                        height: 12,
                        border: `2px solid`,
                        borderColor: `${color}`,
                        borderRadius: '32px',
                        mr: 2,
                    }}
                />
                <Box>
                    <Typography fontWeight={500} fontSize={14}>
                        {label}
                    </Typography>
                    <Typography fontSize={12} color="text.secondary">
                        Updated: {updated}
                    </Typography>
                </Box>
            </Box>
            {/* Skill Progress */}
            <Box position="relative" display="inline-flex">
                {/* Outer Circular Progress */}
                <CircularProgress
                    variant="determinate"
                    value={value}
                    sx={{ color, width: "100px", height: "100px" }}
                    thickness={2}
                />
                {/* Inner text overlay */}
                <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography
                        fontSize={12}
                        component="div"
                        sx={{ fontWeight: "bold", color }}
                    >
                        {`${Math.round(value)}%`}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

const MySkills = () => {
    const skills = [
        { name: 'Figma', updated: '15 May 2025', progress: 95, color: '#F26522' },
        { name: 'HTML', updated: '12 May 2025', progress: 85, color: '#03C95A' },
        { name: 'CSS', updated: '12 May 2025', progress: 70, color: '#AB47BC' },
        { name: 'Wordpress', updated: '15 May 2025', progress: 61, color: '#1B84FF' },
        { name: 'Javascript', updated: '13 May 2025', progress: 58, color: '#212525' },
        { name: 'React js', updated: '20 May 2025', progress: 40, color: '#FFC107' },
        { name: 'Next js', updated: '29 May 2025', progress: 70, color: '#3b7080' },
    ];

    return (
        <Card sx={{
            height: {
                xs: 'auto', // Small screens
                sm: 'auto', // Medium screens
                md: 'auto', // Large screens
                lg: '471px', // Large screens
            },
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px',
            }}>
                <Typography fontSize={16} fontWeight={600}>My Skills</Typography>
            </Box>
            <Divider sx={{ m: 0 }} />
            <PerfectScrollbar style={{ maxHeight: 422 }}>
                <Box padding={'15px'}>
                    {skills.map((skill, index) => (
                        <SkillProgress
                            key={index}
                            label={skill.name}
                            value={skill.progress}
                            color={skill.color}
                            updated={skill.updated}
                        />
                    ))}
                </Box>
            </PerfectScrollbar>
        </Card>
    )
}

export default MySkills
