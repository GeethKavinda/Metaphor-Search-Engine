import scrapy
import re

class SongspiderSpider(scrapy.Spider):
    name = 'songspider'
    allowed_domains = ['www.sinhalasongbook.com']
    start_urls = ['https://www.sinhalasongbook.com/category/sunil-edirisinghe/page/%d/' % i for i in range(1,4)]

    def RemoveUnnessary(self,lyrics):
        structured_lyrics = ''
        for i in range(len(lyrics)):
            updated_string = re.sub(r'[a-zA-Z] |[a-zA-Z]|\d|\t|#|[\([{})\]]|-|,|∆|—|\/|\'|\|+|', '', lyrics[i])
            # updated_strings = re.sub(r'\s\s|\s\s\s|\s\s\s\s', '\n', updated_string)
            structured_lyrics += updated_string
        temp = structured_lyrics.splitlines()
        output = ""
        for word in temp:
            if (not word.isspace() and len(word) > 0 and not word.__contains__("+")):
                output += f"{word}\n"
        return output

    def parse(self, response):
        songlinks = response.css('h2.entry-title a::attr("href")').getall()
        for songlink in songlinks:
            yield response.follow(songlink, callback=self.parse_songs)

    def parse_songs(self,response):
        lyrics = response.css("pre ::text").getall()
        name = response.css('h1.entry-title').get().replace('<h1 class="entry-title">','').replace('</h1>','').strip()
        author = response.css("div.su-column-inner span.lyrics a ::text").get()
        singer = response.css("div.su-column-inner span.entry-categories a ::text").getall()
        genre = response.css("div.su-column-inner span.entry-tags a ::text").getall()
        composer = response.css("div.su-column-inner span.music a ::text").get()

        yield {
            'Name': name,
            'Lyrics':self.RemoveUnnessary("".join(lyrics)),
            'Lyricist ': author,
            'Singer': singer,
            'Genre': genre,
            'Music Composer': composer,
            'Metaphor' : "metaphor",
            'Interpretation' : "interpretation"
        }