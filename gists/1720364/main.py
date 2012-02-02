
def main():
    #... ignoring boring templating stuff...
    
    img.save(os.path.join(namedir,"original_image.jpg"))

    ar=[]
    for x in range(img.size[0]-1):
        row =[]
        for y in range(img.size[1]-1):
            row.append(img.getpixel((x,y)))
        ar.append(row)

    links = []

    dd = { 0:'r', 1:'g', 2:'b'}
    times = []
    perms = list(itertools.permutations([0,1,2]))
    for p in perms:

        imgname = ".".join([dd[i] for i in p]) + ".jpg"
        times.append((time.time(), os.path.join(namedir,imgname), "started"))

        newimg = munge(img,ar,p)
        times.append((time.time(), os.path.join(namedir,imgname), "munged"))

        newimg.save(os.path.join(namedir, imgname), "JPEG")
        times.append((time.time(), os.path.join(namedir,imgname), "saved"))

    perms = list(itertools.product('01',repeat=3))
    perms = [map(int,x) for x in perms]

    for p in perms:

        imgname = ".".join([dd[i] for i in p]) + ".jpg"
        times.append((time.time(), os.path.join(namedir,imgname), "started"))

        newimg = munge_filter(img,ar,p)
        times.append((time.time(), os.path.join(namedir,imgname), "munged"))

        newimg.save(os.path.join(namedir,imgname), "JPEG")
        times.append((time.time(), os.path.join(namedir,imgname), "saved"))

    timelog = open(os.path.join(namedir,"log.txt"),'w')
    for record in times:
        timelog.write('\t'.join(str (x) for x in record) + '\n')
