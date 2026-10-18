from pathlib import Path
from PIL import Image, ImageDraw

sources = {
    'desktop': ('www.prodirectsport.com_pages_tennis.png',1350,8428),
    'tablet': ('www.prodirectsport.com_pages_tennis-tablate.png',768,8192),
    'mobile': ('www.prodirectsport.com_pages_tennis-mobile-screen.png',375,8192),
}
source_directory = Path('C:/Users/TOL/Downloads')
for name, (filename,width,height) in sources.items():
    raw = Image.open(f'qa/{name}-density-raw.png')
    capture = raw.resize((width, round(raw.height*width/raw.width)))
    capture.crop((0,0,width,height)).save(f'qa/{name}-implementation.png')
    reference = Image.open(source_directory / filename).resize((width,height))
    for region, h, size in [('top',1800,375 if name=='mobile' else 675),('full',height,300)]:
        board = Image.new('RGB',(size*2+10,round(h*size/width)+30),'#ddd')
        for index, im in enumerate([reference,capture]):
            board.paste(im.crop((0,0,width,h)).resize((size,round(h*size/width))),(index*(size+10),30))
        draw=ImageDraw.Draw(board)
        draw.text((5,10),'REFERENCE',fill='black')
        draw.text((size+15,10),'IMPLEMENTATION',fill='black')
        board.save(f'qa/{name}-{region}-comparison.png')
