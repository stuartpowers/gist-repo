
SELECT DATEDIFF(lastsend,firstsend) AS spread,
       totalshares,
       firstsend,
       lastsend,
       FromAddress
FROM
  (SELECT count(*),
          MIN(ModifiedDate) AS firstsend ,
          MAX(ModifiedDate) AS lastsend,
          FromAddress,
          count(*) AS totalshares
   FROM Message
   GROUP BY FromAddress
   ORDER BY totalshares) AS subquery;


SELECT mc.Mood,
       REPLACE(mc.Name,'<85>',''),
       count(*) AS playcount,
       REPEAT('#',COUNT(*))
FROM ClickEvent ce,
     MusicClip mc
WHERE ce.EventType='played.play'
  AND isnull(ce.OriginalMessageID)
  AND ce.MusicClipID=mc.musicClipID
  AND ce.Hostname NOT LIKE '%trackPlay'
GROUP BY ce.MusicClipID
ORDER BY mc.Mood,
         mc.musicClipID;




SELECT COUNT(*) AS COUNT,
       EventType,
       Mood
FROM ClickEvent
JOIN MusicClipFinal mf ON ClickEvent.MusicClipID=mf.MusicClipID
WHERE EventType = "email.link"
  OR EventType = "twitter.intent"
  OR EventType = "send.sms"
GROUP BY EventType,
         Mood



SELECT COUNT(*) AS COUNT,
       EventType,
       mf.MusicClipID,
       SongName,
       Mood
FROM ClickEvent
JOIN MusicClipFinal mf ON ClickEvent.MusicClipID=mf.MusicClipID
WHERE EventType = "email.link"
  OR EventType = "twitter.intent"
  OR EventType = "send.sms"
GROUP BY EventType,
         mf.MusicClipID


SELECT COUNT(*) AS COUNT,
       EventType,
       SongName,
       Mood,
       DATE(ClickEvent.DateTime) AS ShareDate,
       mf.MusicClipID
FROM ClickEvent
JOIN MusicClipFinal mf ON ClickEvent.MusicClipID=mf.MusicClipID
WHERE EventType = "email.link"
  OR EventType = "twitter.intent"
  OR EventType = "send.sms"
GROUP BY EventType,
         mf.MusicClipID,
         DATE(ClickEvent.DateTime)

