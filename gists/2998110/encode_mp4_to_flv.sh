
# function which encodes .mp4 files to .flv
#    this handles the fact that the original .mp4 files
#    have improper/incompatible audio/video sample rates
 
function encode_mp4_to_flv ()
{
    for i in *mp4;
    do
        echo "time ffmpeg -i $i -codec:v copy -codec:a libmp3lame -b:a 128k -ar 44100 ${i/mp4/flv}";
    done
}


stu@sente:/some/dir$ encode_mp4_to_flv  | columnate.awk
time ffmpeg -i 1_Code.mp4     -codec:v copy -codec:a libmp3lame -b:a 128k -ar 44100 1_Code.flv
time ffmpeg -i 2_Business.mp4 -codec:v copy -codec:a libmp3lame -b:a 128k -ar 44100 2_Business.flv
time ffmpeg -i 3_Safety.mp4   -codec:v copy -codec:a libmp3lame -b:a 128k -ar 44100 3_Safety.flv
time ffmpeg -i 4_Energy.mp4   -codec:v copy -codec:a libmp3lame -b:a 128k -ar 44100 4_Energy.flv
time ffmpeg -i 5_Lead.mp4     -codec:v copy -codec:a libmp3lame -b:a 128k -ar 44100 5_Lead.flv
time ffmpeg -i 6_93A.mp4      -codec:v copy -codec:a libmp3lame -b:a 128k -ar 44100 6_93A.flv


