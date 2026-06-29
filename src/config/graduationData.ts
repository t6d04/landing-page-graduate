export interface GraduationData {
  graduateName: string;
  major: string;
  university: string;
  ceremonyDate: string; // "05/07/2026"
  ceremonyTime: string; // "08:00 - 10:00"
  location: string;
  locationAddress: string;
  locationCoords: {
    lat: number;
    lng: number;
  };
  rsvpDeadline: string;
  phone?: string;
  facebook?: string;
  thankYouNotes: {
    [key: string]: {
      recipientName: string;
      roleTitle: string;
      letterTitle: string;
      message: string;
    };
  };
}

export const graduationData: GraduationData = {
  graduateName: "Nam Lê",
  major: "Kỹ thuật Máy tính",
  university: "Trường Đại học Công nghệ - Đại học Quốc gia Hà Nội",
  ceremonyDate: "05/07/2026",
  ceremonyTime: "08:00 - 10:00",
  location: "Hội trường Nguyễn Văn Đạo",
  locationAddress: "144 Xuân Thủy, Cầu Giấy, Hà Nội",
  locationCoords: {
    lat: 21.0378,
    lng: 105.7825,
  },
  rsvpDeadline: "03/07/2026",
  phone: "0356653285",
  facebook: "www.facebook.com/namlph2784/",
  thankYouNotes: {
    parents: {
      recipientName: "Bố mẹ & Gia đình",
      roleTitle: "System Backbones / Nguồn Cấp Lực Lượng Core",
      letterTitle: "Gửi Bố Mẹ và Gia Đình Thân Yêu",
      message: "Con xin gửi lời cảm ơn sâu sắc nhất tới bố mẹ và gia đình, những người đã luôn là điểm tựa vững chắc nhất, cung cấp mọi nguồn lực và động lực để con hoàn thành chặng đường học tập này. Không có sự hi sinh và yêu thương vô điều kiện của bố mẹ, con không thể có được ngày hôm nay. Tấm bằng Kỹ sư này là thành quả của cả gia đình chúng ta.",
    },
    teachers: {
      recipientName: "Thầy cô",
      roleTitle: "Compiler / Bộ Biên Dịch Tri Thức & Định Hướng",
      letterTitle: "Gửi Ban Giám Hiệu và Quý Thầy Cô UET",
      message: "Em xin chân thành cảm ơn các thầy cô giáo khoa Công nghệ Thông tin và Kỹ thuật Máy tính, Trường Đại học Công nghệ - ĐHQGHN. Thầy cô đã không chỉ truyền đạt những kiến thức chuyên môn sâu sắc về phần cứng, phần mềm và hệ thống, mà còn là người 'biên dịch' những định hướng đầu tiên, giúp em khai mở tư duy và đam mê khoa học công nghệ để vững bước vào tương lai.",
    },
    friends: {
      recipientName: "Bạn bè & Đồng chí",
      roleTitle: "Peer-to-Peer Node / Mạng Lưới Phân Phối Băng Thông",
      letterTitle: "Gửi Những Người Bạn Đồng Hành",
      message: "Cảm ơn các cậu - những nodes kết nối quan trọng trong mạng lưới 4 năm đại học của tớ. Cảm ơn vì đã cùng chia sẻ những đêm chạy deadline, những kì thi căng thẳng, những buổi thảo luận nhóm và vô vàn kỉ niệm đáng nhớ tại UET. Mạng lưới tình bạn này là tài sản quý giá nhất mà tớ có được sau những năm tháng thanh xuân dưới mái trường này.",
    },
  },
};
