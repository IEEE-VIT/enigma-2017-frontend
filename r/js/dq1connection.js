 $("#answer_id").on('keydown', function(e)
               {
               
               var defaultStr = '.,pyfgcrl/aoeuidhtns-;qjkxbmwvz';
               var checkstr = $(this).val();
               var str1 = '';
              
               str1=checkstr.substring(0,checkstr.length-1);
                var ch = checkstr.charCodeAt(checkstr.length-1);
                   if (ch==101){str1 += defaultStr.charAt(0);}
                          else if (ch==113){str1 += "'";}
                          else if (ch==81){str1 += '"';}
                          else if (ch==87){str1 += "<";}
                          else if (ch==69){str1 += ">";}
                          else if (ch==123){str1 += "?";}
                          else if (ch==34){str1 += "-";}


                          else if (ch==119){str1 += defaultStr.charAt(1);}
                          else if (ch==114){str1 += defaultStr.charAt(2);}
                          else if (ch==116){str1 += defaultStr.charAt(3);}
                          else if (ch==121){str1 += defaultStr.charAt(4);}
                          else if (ch==117){str1 += defaultStr.charAt(5);}
                          else if (ch==105){str1 += defaultStr.charAt(6);}
                          else if (ch==111){str1 += defaultStr.charAt(7);}
                          else if (ch==112){str1 += defaultStr.charAt(8);}
                          else if (ch==91){str1 += defaultStr.charAt(9);}
                          else if (ch==97){str1 += defaultStr.charAt(10);}
                          else if (ch==115){str1 += defaultStr.charAt(11);}
                          else if (ch==100){str1 += defaultStr.charAt(12);}
                          else if (ch==102){str1 += defaultStr.charAt(13);}
                          else if (ch==103){str1 += defaultStr.charAt(14);}
                          else if (ch==104){str1 += defaultStr.charAt(15);}
                          else if (ch==106){str1 += defaultStr.charAt(16);}
                          else if (ch==107){str1 += defaultStr.charAt(17);}
                          else if (ch==108){str1 += defaultStr.charAt(18);}
                          else if (ch==59){str1 += defaultStr.charAt(19);}
                          else if (ch==39){str1 += defaultStr.charAt(20);}
                          else if (ch==122){str1 += defaultStr.charAt(21);}
                          else if (ch==120){str1 += defaultStr.charAt(22);}
                          else if (ch==99){str1 += defaultStr.charAt(23);}
                          else if (ch==118){str1 += defaultStr.charAt(24);}
                          else if (ch==98){str1 += defaultStr.charAt(25);}
                          else if (ch==110){str1 += defaultStr.charAt(26);}
                          else if (ch==109){str1 += defaultStr.charAt(27);}
                          else if (ch==44){str1 += defaultStr.charAt(28);}
                          else if (ch==46){str1 += defaultStr.charAt(29);}
                          else if (ch==47){str1 += defaultStr.charAt(30);}
                        



                   else{
                        str1 += checkstr.charAt(i);
                       }
                       
                  
               $(this).focus();
               $(this).val(str1);
            });



