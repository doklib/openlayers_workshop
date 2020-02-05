package com.map.map;

import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.charset.CharacterCodingException;
import java.nio.charset.Charset;
import java.nio.charset.CharsetDecoder;
import java.util.Locale;
import java.util.Map.Entry;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.apache.commons.io.IOUtils;

@Controller
public class MapController {

	private static final Logger logger = LoggerFactory.getLogger(MapController.class);

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {

		return "main";
	}

	/**
	 * Get 방식 WMS 프록시
	 * 
	 * @param request  요청 객체
	 * @param response 응답 객체
	 * @throws Exception
	 */
	@RequestMapping(value = "/proxy.do", method = RequestMethod.GET)
	public void proxyWMSGet(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String urlStr = "http://localhost:8080/geoserver/tutorial/wms";
		proxyGet(urlStr, request, response);

	}

	/**
	 * Get 방식 프록시
	 * 
	 * @param urlStr   요청 주소
	 * @param request  요청 객체
	 * @param response 응답 객체
	 * @throws IOException
	 */

	public void proxyGet(String urlStr, HttpServletRequest request, HttpServletResponse response) throws IOException {
		HttpURLConnection huc = null;
		OutputStream ios = null;
		String cql = "";
		String cqlType = "", cqlKey = "", cqlVal = "";

		try {
			request.setCharacterEncoding("UTF-8");
			StringBuffer params = new StringBuffer();
			for (Object param : request.getParameterMap().entrySet()) {

				@SuppressWarnings("unchecked")
				Entry<String, String[]> entry = (Entry<String, String[]>) param;

				if (entry.getKey().indexOf('=') >= 0) {
					params.append(getLocaleString(entry.getKey()));
				} else {
					params.append(entry.getKey());
					params.append("=");

					String[] values = entry.getValue();
					if (values.length > 0) {
						if (request.getCharacterEncoding() == null)
							params.append(URLEncoder.encode(getLocaleString(values[0]), "UTF-8"));
						else
							params.append(URLEncoder.encode(values[0].toString(), "UTF-8"));
					}
					params.append("&");

					if (entry.getKey().equals("searchType"))
						cqlType = URLEncoder.encode(values[0], "UTF-8");
					if (entry.getKey().equals("searchCond"))
						cqlKey = URLEncoder.encode(values[0], "UTF-8");
					if (entry.getKey().equals("searchWord"))
						cqlVal = URLEncoder.encode(values[0], "UTF-8");
				}
			}
			if (params.length() > 0 && params.substring(params.length() - 1).equals("&"))
				params.deleteCharAt(params.length() - 1);

			cql = "&CQL_FILTER=" + cqlKey;

			if (cqlType.equals("")) {
				cql += "=" + cqlVal;
			} else {
				cql += "%20like%20%27" + cqlVal + "%25%27";
			}

			if (!cqlKey.equals("")) {
				params.append(cql);
			}

			URL url = new URL(urlStr.concat("?") + params);
			URLConnection connection = url.openConnection();
			huc = (HttpURLConnection) connection;
			huc.setRequestMethod("GET");
			huc.setDoOutput(true);
			huc.setDoInput(true);
			huc.setUseCaches(false);
			huc.setDefaultUseCaches(false);

			response.reset();
			response.setContentType(huc.getContentType());

			ios = response.getOutputStream(); 
			//System.out.println(url);
			 IOUtils.copy(huc.getInputStream(), ios);
		} catch (IOException e) {
			logger.warn(e.getMessage()); 
			// throw e; } finally {
			if (ios != null) {
				ios.close();
			}
			if (huc != null) {
				huc.disconnect();
			}
		}
	}

	/**
	 * 한글 값 처리
	 * 
	 * @param value 인코딩할 문자열
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	private String getLocaleString(String value) throws UnsupportedEncodingException {
		byte[] b;
		b = value.getBytes("8859_1");
		final CharsetDecoder decoder = Charset.forName("UTF-8").newDecoder();
		try {
			final CharBuffer r = decoder.decode(ByteBuffer.wrap(b));
			return r.toString();
		} catch (final CharacterCodingException e) {
			return new String(b, "EUC-KR");
		}
	}

	

}
